import type { Record } from './Record'

export const PROGRAM_ITEMS_TABLE = 'program_items'

export type ProgramItem = Omit<Record, 'updated_at'> & {
  exercise_id: string | null
  goal: string
  order: string
  restrictions?: string | null
  sets?: string | null
  reps?: string | null
  program_id?: string | null
}
