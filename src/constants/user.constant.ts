import { UserGenderEnum } from '@/enums'

export const USER_GENDER_TEXT: { [key in UserGenderEnum]: string } = {
  [UserGenderEnum.MALE]: 'Nam',
  [UserGenderEnum.FEMALE]: 'Nữ',
  [UserGenderEnum.OTHER]: 'Khác',
}
