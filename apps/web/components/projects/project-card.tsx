import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ProjectItem } from '@/lib/content/projects'

type ProjectCardProps = {
  project: ProjectItem
  isVisible: boolean
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

export function ProjectCard({ project, isVisible, isHovered, onHover }: ProjectCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${isHovered ? 'scale-105 z-10' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="relative h-80 overflow-hidden bg-muted">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}
        />

        <div className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-90' : 'opacity-70'
        }`} />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold">
            {project.category}
          </span>
        </div>

        <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
        </div>

        <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">{project.title}</h3>
          <div className="flex items-center gap-2 text-primary-foreground/90 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{project.location}</span>
          </div>

          <div className={`flex items-center gap-4 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <span className="text-xs text-primary-foreground/80">Alan:</span>
              <span className="text-sm font-semibold text-primary-foreground">{project.area}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <span className="text-xs text-primary-foreground/80">Yıl:</span>
              <span className="text-sm font-semibold text-primary-foreground">{project.year}</span>
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
          isHovered ? 'translate-x-full' : ''
        }`} />
      </div>

      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
        isHovered ? 'border-accent shadow-2xl shadow-accent/50' : 'border-transparent'
      }`} />
    </div>
  )
}
