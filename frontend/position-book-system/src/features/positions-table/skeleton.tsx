import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton({ count }: { count: number }) {
  return (
    <>
      {[...Array(count)].map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {[...Array(count)].map((_, colIndex) => (
            <TableCell key={colIndex} className="h-15">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
