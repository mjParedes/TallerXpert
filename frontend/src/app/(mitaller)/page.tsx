import { SectionServices, HeroHome } from '@/components'
import { SectionInterface } from '@/components/section-interface/SectionInterface';
import { SectionSearch } from '@/components/section-search/SectionSearch';

export default function Home() {
  return (
    <main>
      {/* <h1>Landing page</h1> */}
      <HeroHome />
      <SectionInterface />
      <SectionServices />
      <SectionSearch />
    </main>
  )
}
