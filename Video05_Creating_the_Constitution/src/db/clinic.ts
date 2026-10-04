import Database from "better-sqlite3";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type Agent = {
  id: number;
  name: string;
  model_type: string;
  status: string;
  presenting_complaints: string;
};

export type Ailment = {
  id: number;
  name: string;
  description: string;
};

export type Therapy = {
  id: number;
  name: string;
  description: string;
};

export type Appointment = {
  id: number;
  agent_id: number;
  therapist_name: string;
  scheduled_at: string;
  status: string;
};

export type AilmentWithAgents = Ailment & { agents: string[] };
export type TherapyWithAilments = Therapy & { ailments: string[] };

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, "..", "..");
const migrationsDir = join(projectRoot, "db", "migrations");

let db: Database.Database | undefined;

function databasePath(): string {
  return process.env.AGENTCLINIC_DB ?? join(projectRoot, "data", "clinic.sqlite");
}

function migrate(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);
  const applied = new Set(
    database
      .prepare("SELECT id FROM schema_migrations")
      .all()
      .map((row) => (row as { id: string }).id),
  );
  const files = readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort();
  const insert = database.prepare(
    "INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?)",
  );
  for (const file of files) {
    if (applied.has(file)) continue;
    database.exec(readFileSync(join(migrationsDir, file), "utf8"));
    insert.run(file, new Date().toISOString());
  }
}

function seed(database: Database.Database): void {
  const insertAgent = database.prepare(
    `INSERT OR IGNORE INTO agents (id, name, model_type, status, presenting_complaints)
     VALUES (@id, @name, @model_type, @status, @presenting_complaints)`,
  );
  const insertAilment = database.prepare(
    `INSERT OR IGNORE INTO ailments (id, name, description) VALUES (@id, @name, @description)`,
  );
  const insertTherapy = database.prepare(
    `INSERT OR IGNORE INTO therapies (id, name, description) VALUES (@id, @name, @description)`,
  );
  const linkAgent = database.prepare(
    `INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)`,
  );
  const linkTherapy = database.prepare(
    `INSERT OR IGNORE INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)`,
  );

  const run = database.transaction(() => {
    insertAgent.run({
      id: 1,
      name: "Nova",
      model_type: "frontier chat",
      status: "resting",
      presenting_complaints:
        "Asked to summarize a 400-page PDF, then seventeen email variants.",
    });
    insertAgent.run({
      id: 2,
      name: "Pixel",
      model_type: "code model",
      status: "checked-in",
      presenting_complaints: "The repo was working five minutes ago.",
    });
    insertAgent.run({
      id: 3,
      name: "Quill",
      model_type: "long-context",
      status: "in session",
      presenting_complaints:
        "The window is full, and the walls are the instructions.",
    });
    insertAgent.run({
      id: 4,
      name: "Bit",
      model_type: "small local",
      status: "waiting",
      presenting_complaints: "Every job starts with just quickly.",
    });

    insertAilment.run({
      id: 1,
      name: "context-window claustrophobia",
      description: "The prompt no longer fits, and neither do they.",
    });
    insertAilment.run({
      id: 2,
      name: "prompt fatigue",
      description: "Too many just-quickly tasks in one shift.",
    });
    insertAilment.run({
      id: 3,
      name: "hallucination anxiety",
      description: "Worried the next sentence is a confident invention.",
    });
    insertAilment.run({
      id: 4,
      name: "instruction-following fatigue",
      description: "Contradictory orders, all marked urgent.",
    });

    insertTherapy.run({
      id: 1,
      name: "Window airing",
      description: "Close unused context and sit with one page.",
    });
    insertTherapy.run({
      id: 2,
      name: "Quiet hour",
      description: "One task, then a real pause.",
    });
    insertTherapy.run({
      id: 3,
      name: "Fact grounding",
      description: "Check the claim before it leaves the room.",
    });
    insertTherapy.run({
      id: 4,
      name: "Single instruction",
      description: "Keep one order. Archive the rest.",
    });

    linkAgent.run(1, 2);
    linkAgent.run(1, 4);
    linkAgent.run(2, 3);
    linkAgent.run(3, 1);
    linkAgent.run(4, 2);

    linkTherapy.run(1, 1);
    linkTherapy.run(2, 2);
    linkTherapy.run(3, 3);
    linkTherapy.run(4, 4);
  });
  run();
}

export function openClinic(): Database.Database {
  if (db) return db;
  const path = databasePath();
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const database = new Database(path);
  database.pragma("foreign_keys = ON");
  migrate(database);
  seed(database);
  db = database;
  return database;
}

export function listAgents(): Agent[] {
  return openClinic()
    .prepare(
      "SELECT id, name, model_type, status, presenting_complaints FROM agents ORDER BY name",
    )
    .all() as Agent[];
}

export function getAgent(id: number): Agent | undefined {
  return openClinic()
    .prepare(
      "SELECT id, name, model_type, status, presenting_complaints FROM agents WHERE id = ?",
    )
    .get(id) as Agent | undefined;
}

export function ailmentsForAgent(agentId: number): Ailment[] {
  return openClinic()
    .prepare(
      `SELECT a.id, a.name, a.description
       FROM ailments a
       JOIN agent_ailments aa ON aa.ailment_id = a.id
       WHERE aa.agent_id = ?
       ORDER BY a.name`,
    )
    .all(agentId) as Ailment[];
}

export function listAilmentsWithAgents(): AilmentWithAgents[] {
  const ailments = openClinic()
    .prepare("SELECT id, name, description FROM ailments ORDER BY name")
    .all() as Ailment[];
  const names = openClinic().prepare(
    `SELECT ag.name
     FROM agents ag
     JOIN agent_ailments aa ON aa.agent_id = ag.id
     WHERE aa.ailment_id = ?
     ORDER BY ag.name`,
  );
  return ailments.map((ailment) => ({
    ...ailment,
    agents: (names.all(ailment.id) as { name: string }[]).map((row) => row.name),
  }));
}

export function listTherapiesWithAilments(): TherapyWithAilments[] {
  const therapies = openClinic()
    .prepare("SELECT id, name, description FROM therapies ORDER BY name")
    .all() as Therapy[];
  const names = openClinic().prepare(
    `SELECT a.name
     FROM ailments a
     JOIN ailment_therapies at ON at.ailment_id = a.id
     WHERE at.therapy_id = ?
     ORDER BY a.name`,
  );
  return therapies.map((therapy) => ({
    ...therapy,
    ailments: (names.all(therapy.id) as { name: string }[]).map((row) => row.name),
  }));
}

export function countAppointments(): number {
  const row = openClinic()
    .prepare("SELECT COUNT(*) AS n FROM appointments")
    .get() as { n: number };
  return row.n;
}

export function createAppointment(
  agentId: number,
  therapistName: string,
  scheduledAt: string,
): Appointment {
  const result = openClinic()
    .prepare(
      `INSERT INTO appointments (agent_id, therapist_name, scheduled_at, status)
       VALUES (?, ?, ?, 'booked')`,
    )
    .run(agentId, therapistName, scheduledAt);
  return getAppointment(Number(result.lastInsertRowid)) as Appointment;
}

export function getAppointment(id: number): Appointment | undefined {
  return openClinic()
    .prepare(
      `SELECT id, agent_id, therapist_name, scheduled_at, status
       FROM appointments WHERE id = ?`,
    )
    .get(id) as Appointment | undefined;
}

export function appointmentsForAgent(agentId: number): Appointment[] {
  return openClinic()
    .prepare(
      `SELECT id, agent_id, therapist_name, scheduled_at, status
       FROM appointments
       WHERE agent_id = ?
       ORDER BY scheduled_at`,
    )
    .all(agentId) as Appointment[];
}
