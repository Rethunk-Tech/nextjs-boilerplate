import type { Record } from './Record'

export const PROGRAMS_TABLE = 'programs'

export type Program = Omit<Record, 'updated_at'> & {
  order?: string
  name?: string
  patient_id?: string
}
