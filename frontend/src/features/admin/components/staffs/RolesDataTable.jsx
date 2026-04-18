import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ---------------- DATA TABLE ---------------- */

export function RolesDataTable({ data = [], onNameClick }) {
  const [rowSelection, setRowSelection] = React.useState({});
  console.log(data);

  const columns = React.useMemo(
    () => [
      /* Role */
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const isRestricted = ["Admin", "Receptionist", "Therapist", "Customer"].includes(
            row.original.role_name
          );
          return (
            <Button 
              variant="link"
              title={isRestricted ? "This roles cannot be edited" : "Click to edit"}
              className={`underline ${isRestricted ? "text-muted-foreground cursor-not-allowed" : "text-primary"}`}
              onClick={() => {
                if (isRestricted) return;
                onNameClick(row.original);
              }}
            >
              {row.original.role_name}
            </Button> 
          )
        } 
      },

      /*  Description */
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          getValue()
        ),
      },
    ],
    []
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
              <TableCell colSpan={4} className="text-center py-6">
                No role data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}