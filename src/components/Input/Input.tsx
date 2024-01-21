import React, { forwardRef } from 'react'
import clsx from 'clsx'

import { InputProps } from 'src/components/Input/types'
import styles from 'src/components/Input/Input.module.scss'

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ className, onChange: onChangeProp, value, placeholder, icon }, ref) => {
    const onChange: React.JSX.IntrinsicElements['input']['onChange'] = (
      event,
    ) => {
      const { value } = event.target
      onChangeProp(value, event)
    }

    return (
      <div ref={ref} className={clsx(styles.Root, className)}>
        {icon}
        <input
          className={styles.Input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    )
  },
)
