import type { Record } from './Record'

export const EXERCISE_TABLE = 'exercises'
export const EXERCISE_DETAIL_TABLE = 'exercise_details'

export type Exercise = Record & {
  name: string
  category: string
  subcategory: string
  functional_group: string
  primary_media?: string
}

export type ExerciseDetail = Record & {
  exercise_id: string
  summary?: string
  instructions?: string
  additional_media?: string
  additional_text?: string
  clinical_overview?: string
  clinical_goal?: string
  normal_ranges?: string
  exercise_parameters?: string
  typical_performance?: string
  clinical_measurements?: string
  modifications?: string
  progressions?: string
}
