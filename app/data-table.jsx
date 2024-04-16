"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function DataTable({ expenses }) {

    return (
        <div className="rounded-md border">
            <Table>
                <TableCaption>A list of your recent expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses?.map(expense => (
                        <TableRow key={expense.expenseId}>
                            <TableCell className="font-medium">{expense.expenseId}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell className="text-right">{expense.category}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    )
}
