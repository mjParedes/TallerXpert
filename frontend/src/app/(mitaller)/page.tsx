import { SectionServices } from '@/components'
import { SectionSearch } from '@/components/section-search/SectionSearch';

export default function Home() {
  return (
    <main>

      <h1>Landing page</h1>

      <SectionServices />
      <SectionSearch />
    </main>
  );
}
