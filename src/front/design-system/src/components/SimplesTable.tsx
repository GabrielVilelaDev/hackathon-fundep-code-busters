import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import type { TableHeader as TableHeaderType } from "@/types";

interface SimplesTableProps<T extends Record<string, unknown>> {
  headers: TableHeaderType[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
}

export const SimplesTable = <T extends Record<string, unknown>>({
  headers,
  data,
  emptyMessage = "Nenhum dado encontrado",
  className,
  "aria-label": ariaLabel,
  ...props
}: SimplesTableProps<T>) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <Table className={className} aria-label={ariaLabel} {...props}>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.key}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={`row-${index}`}>
            {headers.map((header) => (
              <TableCell key={`${index}-${header.key}`}>
                {String(row[header.key as keyof T] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
