import { HeadlinesProps } from 'src/components/Typography/Headlines/types'

export const typeToClassName: Record<HeadlinesProps['type'], string> = {
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6',
}

export const resolutionToClassName: Record<
  HeadlinesProps['resolution'],
  string
> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
}
