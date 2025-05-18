"use client"

import { type ColumnDef } from "@tanstack/react-table"

import type { DataRecord } from "@/services/reports/types"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<DataRecord>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("topic") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "sector",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sector" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("sector") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("region") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("country") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "intensity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Intensity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("intensity") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "likelihood",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likelihood" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("likelihood") || "N/A"}</span>
        </div>
      )
    }
  },
  {
    id: "year",
    accessorFn: row => row.start_year || row.end_year || "N/A",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>{row.getValue("year") || "N/A"}</span>
        </div>
      )
    }
  }
]
