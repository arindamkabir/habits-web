import * as React from "react"
import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PaginationLinkType } from "@/types/Response";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-gray-800/50",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b dark:border-gray-700 transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 dark:hover:bg-gray-800/50 dark:data-[state=selected]:bg-gray-800",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 dark:text-gray-400",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption";

type TableActionProps = DropdownMenuProps & {
  actions: {
    label: string;
    onClick: () => void;
  }[];
}

const TableAction = ({ actions, ...props }: TableActionProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant={"ghost"}
        className="focus:outline-none"
      >
        <span>
          <EllipsisHorizontalIcon
            className="h-6 w-6" />
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40" align="end">
      {
        actions.map((action, index) => (
          <>
            <DropdownMenuItem className="cursor-pointer" key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
            {index !== actions.length - 1 ? <DropdownMenuSeparator /> : null}
          </>
        ))
      }

    </DropdownMenuContent>
  </DropdownMenu>
);

const filledArr = Array(10).fill(0);

const TableRowSkeleton = () => {
  return (
    <>
      {filledArr.map((item, index) => (
        <TableRow key={`skeleton-table-row-${index}`}>
          <TableCell colSpan={100} className='!py-[.8rem]'>
            <Skeleton
              count={1}
              height={40}
              baseColor="#A6ADBB"
              highlightColor="#2B323C"
              style={{
                padding: '1.2rem',
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

const TableEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={100} className="text-center">
        No data available
      </TableCell>
    </TableRow>
  )
}

export type PaginationProps = {
  page?: number,
  pageLinks?: PaginationLinkType[],
  prevPageUrl?: string | null,
  nextPageUrl?: string | null,
  onChange: (page: number) => void
}

const TablePagination = ({ page, onChange, pageLinks, prevPageUrl, nextPageUrl }: PaginationProps) => {
  const handleClick = (link: PaginationLinkType) => {
    if (link.label && page)
      onChange(Number(link.label))
  }

  const handlePreviousClick = () => {
    if (prevPageUrl && page)
      onChange(page - 1)
  };

  const handleNextClick = () => {
    if (nextPageUrl && page)
      onChange(page + 1)
  };
  if (page && (pageLinks !== undefined && pageLinks !== null)) {
    return (
      <Pagination className="pt-6">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => handlePreviousClick()} />
          </PaginationItem>
          {pageLinks.filter((element) => (!isNaN(Number(element.label)))).map((link) => (
            <PaginationItem key={`page-${link.label}`} className="cursor-pointer">
              <PaginationLink onClick={() => handleClick(link)} isActive={link.active} >{link.label}</PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => handleNextClick()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  return (
    <Pagination className="pt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableAction,
  TableRowSkeleton,
  TableEmpty,
  TablePagination
}
