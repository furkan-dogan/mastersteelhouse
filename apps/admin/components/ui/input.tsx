'use client'

import { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
        } ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
