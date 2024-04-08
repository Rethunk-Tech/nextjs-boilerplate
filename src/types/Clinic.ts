import type { Record } from './Record'

export const CLINICS_TABLE = 'clinics'

export type Clinic = Record & {
  display_name: string
}
