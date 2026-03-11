export type ProjectItem = {
  id: number
  title: string
  location: string
  category: string
  image: string
  area: string
  year: string
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'Modern Çelik Villa',
    location: 'İstanbul, Beykoz',
    category: 'Konut',
    image: '/project-1.jpg',
    area: '350 m²',
    year: '2024',
  },
  {
    id: 2,
    title: 'Endüstriyel Tesis',
    location: 'Kocaeli, Gebze',
    category: 'Endüstriyel',
    image: '/project-2.jpg',
    area: '2.500 m²',
    year: '2023',
  },
  {
    id: 3,
    title: 'Ticari Ofis Binası',
    location: 'Ankara, Çankaya',
    category: 'Ticari',
    image: '/project-3.jpg',
    area: '1.200 m²',
    year: '2024',
  },
  {
    id: 4,
    title: 'Lüks Villa Projesi',
    location: 'Antalya, Belek',
    category: 'Konut',
    image: '/project-4.jpg',
    area: '450 m²',
    year: '2023',
  },
  {
    id: 5,
    title: 'Fabrika Tesisi',
    location: 'Bursa, Nilüfer',
    category: 'Endüstriyel',
    image: '/project-5.jpg',
    area: '3.800 m²',
    year: '2024',
  },
  {
    id: 6,
    title: 'Eğitim Kampüsü',
    location: 'İzmir, Bornova',
    category: 'Eğitim',
    image: '/project-6.jpg',
    area: '1.800 m²',
    year: '2023',
  },
]
