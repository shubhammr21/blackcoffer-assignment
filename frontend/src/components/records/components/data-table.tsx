"use client"

import {
  type ColumnDef,
  type OnChangeFn,
  type PaginationOptions,
  type PaginationState,
  type SortingState,
  // type ColumnFiltersState,
  // type VisibilityState,
  flexRender,
  getCoreRowModel,
  // getFacetedRowModel,
  // getFacetedUniqueValues,
  // getFilteredRowModel,
  // getPaginationRowModel,
  // getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationState
  paginationOptions: Pick<PaginationOptions, "onPaginationChange" | "rowCount">
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
}

export function DataTable<TData, TValue>({
  data,
  columns,
  pagination,
  paginationOptions,
  sorting,
  onSortingChange
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination
    },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <DataTableToolbar
          searchKey="title"
          filterKeys={[
            "topic",
            "sector",
            "region",
            "pestle",
            "country",
            "source"
          ]}
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="truncate max-w-xs"
                      title={cell.getValue() as string}
                    >
                      <span className="truncate block">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
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
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Total {table.getRowCount()} records
        </div>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}
