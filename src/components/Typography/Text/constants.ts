import { TextProps } from 'src/components/Typography/Text/types'

export const typeToClassName: Record<TextProps['type'], string> = {
  'body-xxl-semibold': 'Root_BodyXxlSemibold',
  'body-xl-semibold': 'Root_BodyXlSemibold',
  'body-m-semibold': 'Root_BodyMSemibold',
  'body-m-medium': 'Root_BodyMMedium',
  'body-m-regular': 'Root_BodyMRegular',
  'body-s-medium': 'Root_BodySMedium',
  'body-xs-regular': 'Root_BodyXsRegular',
}
