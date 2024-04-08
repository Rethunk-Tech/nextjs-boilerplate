import type { Record } from './Record'

export const PROFILES_TABLE = 'profiles'

export type Profile = Record & {
  first_name: string
  last_name: string
  date_of_birth: string
  height: number
  weight: number
  procedure: string
  sex: 'm' | 'f'
  surgical_limb: string
  injury_date: string
  surgery_date: string | null
}
