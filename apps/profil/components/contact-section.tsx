"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import type { ProfilContactSection } from "@/lib/profil-content"

const iconMap = {
  Phone,
  Mail,
  MapPin,
  Clock,
} as const

type ContactSectionProps = {
  content: ProfilContactSection
}

export function ContactSection({ content }: ContactSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    alert(content.form.successMessage)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium border border-accent/20 mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>{content.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {content.title}{" "}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {content.cards.map((info, index) => {
            const Icon = iconMap[info.icon] ?? Phone
            return (
              <div
                key={`${info.title}-${index}`}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-5 sm:p-6 transition-all duration-700 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${info.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                  <div className="space-y-1">
                    {info.lines.map((line) => {
                      if (info.icon === "Phone") {
                        return (
                          <a key={line} href={`tel:${line}`} className="text-sm text-foreground/80 block">
                            {line}
                          </a>
                        )
                      }
                      if (info.icon === "Mail") {
                        return (
                          <a key={line} href={`mailto:${line}`} className="text-sm text-foreground/80 block">
                            {line}
                          </a>
                        )
                      }
                      return (
                        <p key={line} className="text-sm text-foreground/80">
                          {line}
                        </p>
                      )
                    })}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            )
          })}
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-card border-2 border-border p-6 sm:p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">{content.form.title}</h3>
                <p className="text-muted-foreground">{content.form.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      {content.form.fields.nameLabel}
                      <span className="text-accent">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={content.form.fields.namePlaceholder}
                      required
                      className="h-11 sm:h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      {content.form.fields.phoneLabel}
                      <span className="text-accent">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={content.form.fields.phonePlaceholder}
                      required
                      className="h-11 sm:h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      {content.form.fields.emailLabel}
                      <span className="text-accent">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content.form.fields.emailPlaceholder}
                      required
                      className="h-11 sm:h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      {content.form.fields.subjectLabel}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={content.form.fields.subjectPlaceholder}
                      className="h-11 sm:h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                    {content.form.fields.messageLabel}
                    <span className="text-accent">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={content.form.fields.messagePlaceholder}
                    required
                    className="min-h-32 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      {content.form.submittingLabel}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {content.form.submitLabel}
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
