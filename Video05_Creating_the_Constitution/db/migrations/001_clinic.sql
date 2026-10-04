CREATE TABLE IF NOT EXISTS agents (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  model_type TEXT NOT NULL,
  status TEXT NOT NULL,
  presenting_complaints TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ailments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agent_ailments (
  agent_id INTEGER NOT NULL REFERENCES agents(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  PRIMARY KEY (agent_id, ailment_id)
);

CREATE TABLE IF NOT EXISTS therapies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ailment_therapies (
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  therapy_id INTEGER NOT NULL REFERENCES therapies(id),
  PRIMARY KEY (ailment_id, therapy_id)
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY,
  agent_id INTEGER NOT NULL REFERENCES agents(id),
  therapist_name TEXT NOT NULL,
  scheduled_at TEXT NOT NULL,
  status TEXT NOT NULL
);
