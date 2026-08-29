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
      className={`group relative overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="relative h-80 overflow-hidden bg-muted">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ease-out ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground/90">
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          {project.category}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="mb-1.5 text-xl font-semibold tracking-tight text-primary-foreground">{project.title}</h3>
          <div className="mb-3 flex items-center gap-1.5 text-primary-foreground/75">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm">{project.location}</span>
          </div>

          <div className="flex items-center gap-4 border-t border-primary-foreground/15 pt-3 text-xs text-primary-foreground/70">
            <span>
              Alan <span className="font-medium text-primary-foreground">{project.area}</span>
            </span>
            <span>
              Yıl <span className="font-medium text-primary-foreground">{project.year}</span>
            </span>
            <ArrowUpRight
              className={`ml-auto h-4 w-4 text-accent transition-transform duration-300 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
