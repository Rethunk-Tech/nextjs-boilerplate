import type { Profile } from 'types/Profile'

export const PATIENTS: Profile[] = [
  {
    id:            '1234',
    created_at:    '151236541000',
    first_name:    'John',
    last_name:     'Doe',
    date_of_birth: '151236541000',
    height:        67.5,
    weight:        165.8,
    procedure:     'ACL repair',
    sex:           'm',
    surgical_limb: 'left leg',
    injury_date:   '151236541000',
    surgery_date:  '151236541000',
  },
  {
    id:            '5678',
    created_at:    '151248969000',
    first_name:    'Jane',
    last_name:     'Smith',
    date_of_birth: '151248969000',
    height:        64,
    weight:        125.1,
    procedure:     'Hip replacement',
    sex:           'f',
    surgical_limb: 'right leg',
    injury_date:   '151248969000',
    surgery_date:  '151248969000',
  },
]
