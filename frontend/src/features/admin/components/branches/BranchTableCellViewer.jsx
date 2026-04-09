import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BranchDataTable({ data = [] }) {
    const [rowSelection , setRowSelection ] = React.useState({});

    const columns = React.useMemo (
        () => [
            {
              accessorKey : "branch_name",
              header: "Branch",
              cell : ({ row }) => (
                <Button
                  variant="link"
                  className="underline"
                  onClick={() => onNameClick(row.original)}
                >
                  {row.original.name}
                </Button>
              )
            },
            {
              accessorKey : "contact_number",
              header: "Contact Number",
              cell: ({ getValue }) => (
                getValue()
              )
            },
            {
              accessorKey : "email",
              header: "Email",
              cell: ({ getValue }) => (
                getValue()
              )
            },
            {
              accessorKey : "status",
              header: "Status",
              cell: ({ getValue }) => {
                const value = getValue();
      
                return (
                  <Badge
                  variant={value === "Active" ? "success" : "destructive"}
                  >
                    {value}
                  </Badge>
                );
              },
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
                No staff data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    )
}