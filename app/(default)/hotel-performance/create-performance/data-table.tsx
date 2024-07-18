"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import fetchHotelPerformances from "../queries";
import { useSession } from "next-auth/react";
import Link from "next/link";

type tableType = {
  id: string;
  hotel: {
    name: string;
    location: string;
    rooms: number;
  };
  availableRooms: number;
  sold_rooms: number;
  revenue: number;
  createdAt: string;
};

export function DataTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const session = useSession();

  const dataQuery = useQuery({
    queryKey: ["hotel-performances"],
    queryFn: () => fetchHotelPerformances(session.data?.accessToken),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<tableType, unknown>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Hotel",
      accessorFn: (row) => row.hotel.name,
    },
    {
      accessorKey: "location",
      header: "Location",
      accessorFn: (row) => row.hotel.location,
    },
    {
      accessorKey: "rooms",
      header: "Rooms",
      accessorFn: (row) => row.hotel.rooms,
    },
    {
      accessorKey: "availableRooms",
      header: "Rooms",
      accessorFn: (row) => row.availableRooms,
    },
    {
      accessorKey: "sold_rooms",
      header: "Sold Rooms",
      accessorFn: (row) => row.sold_rooms,
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      accessorFn: (row) => row.sold_rooms,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      accessorFn: (row) => row.createdAt,
    },
  ];

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: false,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter Hotels"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href="/hotel-performance/create-performance">
          <Button>Add a record</Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <div>Show</div>
            <div className="w-20">
              <Input
                type="number"
                max={50}
                min={1}
                width={70}
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
