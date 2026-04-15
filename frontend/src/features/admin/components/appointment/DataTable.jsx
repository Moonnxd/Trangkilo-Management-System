import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/features/admin/components/appointment/AppointmentBadge";
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export function DataTable({ data = [], onNameClick }) {
  const [rowSelection, setRowSelection] = React.useState({});
  console.log(data);

  const columns = React.useMemo(
  () => [
    {
      accessorKey: "client_name",
      header: "Client",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="underline"
          onClick={() => onNameClick(row.original)}
        >
          {`${row.original.client_first_name} ${row.original.client_last_name}`}
        </Button>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "therapist",
      header: "Therapist",
    },
    {
  accessorKey: "date",
  header: "Date",
  cell: ({ getValue }) => {
    const value = getValue();
    return new Date(value).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
},
    {
      accessorKey: "start_time",
      header: "Time",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <Badge variant={statusVariant[value]}>
            {value}
          </Badge>
        );
      },
    },
  ],
  [onNameClick]
);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const statusVariant = {
  Completed: "green",
  Pending: "orange",
  Scheduled: "blue",
  Cancelled: "secondary",
  }

  return (
    <div className="overflow-hidden rounded-lg border ml-4 mr-4">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* BODY */}
        <TableBody className="bg-card">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No staff data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}