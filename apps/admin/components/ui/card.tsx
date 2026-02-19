'use client'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card shadow-sm ${className}`}>
      {children}
    </div>
  )
}

type CardHeaderProps = {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`border-b border-border px-4 py-3 ${className}`}>{children}</div>
}

type CardTitleProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function CardTitle({ children, icon, className = '' }: CardTitleProps) {
  return (
    <h2
      className={`flex items-center gap-2 text-sm font-semibold text-foreground ${className}`}
    >
      {icon}
      {children}
    </h2>
  )
}

type CardContentProps = {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

type CardFooterProps = {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`border-t border-border px-4 py-3 ${className}`}>{children}</div>
  )
}
