'use client'

import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] focus-visible:ring-ring/40',
  secondary:
    'border border-border bg-surface text-foreground hover:bg-muted focus-visible:ring-ring/40',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-muted focus-visible:ring-ring/40',
  ghost:
    'text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/40',
  danger:
    'bg-error text-white hover:bg-error/90 active:scale-[0.98] focus-visible:ring-error/40',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-2.5 text-xs',
  md: 'h-9 gap-2 px-3 text-sm',
  lg: 'h-10 gap-2 px-4 text-sm',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className = '', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
