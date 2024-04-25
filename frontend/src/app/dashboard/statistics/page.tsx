import { Title } from "@/components";
import { TableComponent } from "./components/Table.component";

export default function StatisticsPage() {
  return (
    <div className="space-y-8">
      <Title title="Página de Estadísticas" />
      <TableComponent />
    </div>
  );
}
