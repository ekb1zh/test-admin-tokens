import { TextProps } from 'src/components/Typography/Text/types'

export const typeToClassName: Record<TextProps['type'], string> = {
  'body-xxl-semibold': 'BodyXxlSemibold',
  'body-xl-semibold': 'BodyXlSemibold',
  'body-m-semibold': 'BodyMSemibold',
  'body-m-medium': 'BodyMMedium',
  'body-m-regular': 'BodyMRegular',
  'body-s-medium': 'BodySMedium',
  'body-xs-regular': 'BodyXsRegular',
}

export const resolutionToClassName: Record<TextProps['resolution'], string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
}
