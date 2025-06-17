import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-dropdown-menu';

function LoadingTable({ rows }) {
  const rowCount = rows || 5;
  const tableRows = Array.from({ length: rowCount }, (_, i) => (
    <div className="mb-4" key={i}>
      <Skeleton className="w-full h-8 rounded" />
      <Separator />
    </div>
  ));

  return <>{tableRows}</>;
}

export default LoadingTable;
