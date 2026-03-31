import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

/* ---------------- DRAWER COMPONENT ---------------- */

function StaffDrawer({ row }) {
  const data = row.original;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="p-0">
          {data.header}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Staff Details</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 space-y-3">
          <Input defaultValue={data.header} placeholder="Name" />
          <Input defaultValue={data.type} placeholder="Role" />
          <Input defaultValue={data.status} placeholder="Status" />
        </div>

        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ---------------- DATA TABLE ---------------- */

export function DataTable({ data = [] }) {
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(
    () => [
      /* SELECT CHECKBOX */
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
      },

      /* NAME (with drawer) */
      {
        accessorKey: "header",
        header: "Name",
        cell: ({ row }) => <StaffDrawer row={row} />,
      },

      /* ROLE */
      {
        accessorKey: "type",
        header: "Role",
        cell: ({ getValue }) => (
          <Badge variant="outline">{getValue()}</Badge>
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
              variant="outline"
              className={
                value === "Active"
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }
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
    <div className="rounded-md border ml-4 mr-4">
      <Table>
        {/* HEADER */}
        <TableHeader>
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
        <TableBody>
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
  );
}