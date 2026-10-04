export type BookingInput = {
  therapistName: string;
  scheduledAt: string;
};

export type BookingResult =
  | { ok: true; scheduledAt: string; therapistName: string }
  | { ok: false; errors: string[] };

export function datetimeLocalMin(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export function validateBooking(
  input: BookingInput,
  now = new Date(),
): BookingResult {
  const errors: string[] = [];
  const therapistName = input.therapistName.trim();
  const rawTime = input.scheduledAt.trim();
  if (!therapistName) errors.push("Therapist name is required.");
  const parsed = rawTime ? new Date(rawTime) : null;
  if (!rawTime || !parsed || Number.isNaN(parsed.getTime())) {
    errors.push("Choose a real date and time.");
  } else if (parsed.getTime() <= now.getTime()) {
    errors.push("Choose a date and time in the future.");
  }
  if (errors.length > 0 || !parsed) return { ok: false, errors };
  return {
    ok: true,
    therapistName,
    scheduledAt: parsed.toISOString(),
  };
}
