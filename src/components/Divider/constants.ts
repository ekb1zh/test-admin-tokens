import { DividerProps } from 'src/components/Divider/types'

export const typeToClassName: Record<
  NonNullable<DividerProps['type']>,
  string
> = {
  horizontal: 'Root_horizontal',
  vertical: 'Root_vertical',
}
