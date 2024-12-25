"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable, 
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 5, //default page size
  });
   // Calculate the data to display based on pagination
   const paginatedData = data.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: data?.length,
    onSortingChange: setSorting,

    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  })

  // return (
  //   <div>
  //      <Link href="/">
  //      Home
  //     </Link>
  //       <div className="flex items-center py-4">
  //       <Input
  //         placeholder="Filter emails..."
  //         value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  //         onChange={(event) =>
  //           table.getColumn("email")?.setFilterValue(event.target.value)
  //         }
  //         className="max-w-sm"
  //       />
  //          <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="outline" className="ml-auto">
  //             Columns
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           {table
  //             .getAllColumns()
  //             .filter(
  //               (column) => column.getCanHide()
  //             )
  //             .map((column) => {
  //               return (
  //                 <DropdownMenuCheckboxItem
  //                   key={column.id}
  //                   className="capitalize"
  //                   checked={column.getIsVisible()}
  //                   onCheckedChange={(value) =>
  //                     column.toggleVisibility(!!value)
  //                   }
  //                 >
  //                   {column.id}
  //                 </DropdownMenuCheckboxItem>
  //               )
  //             })}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>
  //   <div className="rounded-md border">
  //     <Table>
  //       <TableHeader>
  //         {table.getHeaderGroups().map((headerGroup) => (
  //           <TableRow key={headerGroup.id}>
  //             {headerGroup.headers.map((header) => {
  //               return (
  //                 <TableHead key={header.id}>
  //                   {header.isPlaceholder
  //                     ? null
  //                     : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                 </TableHead>
  //               )
  //             })}
  //           </TableRow>
  //         ))}
  //       </TableHeader>
  //       <TableBody>
  //         {table.getRowModel().rows?.length ? (
  //           table.getRowModel().rows.map((row) => (
  //             <TableRow
  //               key={row.id}
  //               data-state={row.getIsSelected() && "selected"}
  //             >
  //               {row.getVisibleCells().map((cell) => (
  //                 <TableCell key={cell.id}>
  //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                 </TableCell>
  //               ))}
  //             </TableRow>
  //           ))
  //         ) : (
  //           <TableRow>
  //             <TableCell colSpan={columns.length} className="h-24 text-center">
  //               No results.
  //             </TableCell>
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </div>
  //   <div className="flex items-center justify-end space-x-2 py-4">
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         // onClick={() => table.previousPage()}
  //         // disabled={!table.getCanPreviousPage()}
  //         onClick={() =>
  //           setPagination((prev) => ({
  //             ...prev,
  //             pageIndex: Math.max(prev.pageIndex - 1, 0),
  //           }))
  //         }
  //         disabled={pagination.pageIndex === 0}
  //       >
  //         Previous
  //       </Button>
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         // onClick={() => table.nextPage()}
  //         // disabled={!table.getCanNextPage()}
  //         onClick={() =>
  //           setPagination((prev) => ({
  //             ...prev,
  //             pageIndex: Math.min(
  //               prev.pageIndex + 1,
  //               Math.ceil(data.length / prev.pageSize) - 1
  //             ),
  //           }))
  //         }
  //         disabled={
  //           pagination.pageIndex >= Math.ceil(data.length / pagination.pageSize) - 1
  //         }
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   </div>

  // )
  return (
    <div className="p-6 min-h-screen">
      {/* Home Link */}
      <Link
        href="/"
        className="text-blue-500 underline hover:text-blue-700 transition mb-4 inline-block"
      >
        Home
      </Link>

      {/* Input and Dropdown */}
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-white">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-md bg-white shadow-md">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-300 bg-white shadow">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-100 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
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
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.max(prev.pageIndex - 1, 0),
            }))
          }
          disabled={pagination.pageIndex === 0}
          className="bg-white hover:bg-gray-100 transition"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.min(
                prev.pageIndex + 1,
                Math.ceil(data.length / prev.pageSize) - 1
              ),
            }))
          }
          disabled={
            pagination.pageIndex >=
            Math.ceil(data.length / pagination.pageSize) - 1
          }
          className="bg-white hover:bg-gray-100 transition"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
