type InputElement = React.JSX.IntrinsicElements['input']

export interface InputProps
  extends Pick<InputElement, 'value' | 'placeholder'> {
  onChange: (
    value: string,
    event: Parameters<NonNullable<InputElement['onChange']>>[0],
  ) => void
  className?: string
  icon?: React.ReactNode
}
