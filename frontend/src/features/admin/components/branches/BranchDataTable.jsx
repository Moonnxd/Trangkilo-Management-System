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

/* ---------------- DATA TABLE ---------------- */

export function BranchDataTable({ data = [], onNameClick }) {
  const [rowSelection, setRowSelection] = React.useState({});
  console.log(data);

  const columns = React.useMemo(
    () => [
      // /* NAME */
      {
        accessorKey: "branch_id",
        header: "Branch Name",
        cell: ({ row }) => (
          <Button 
            variant="link"
            className="underline"
            onClick={() => onNameClick(row.original)}  
          >
            {row.original.branch_name}
          </Button> 
        )
      },

      /* BRANCH ADDRESS */
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ getValue }) => (
          getValue()
        ),
      },

      /* CONTACT */
      {
        accessorKey: "contact_number",
        header: "Contact Number",
        cell: ({ getValue }) => (
          getValue()
        ),
      },

      /* EMAIL */
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          getValue()
        ),
      },

      /* STATUS */
      {
        accessorKey: "status",
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
                No branch data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}