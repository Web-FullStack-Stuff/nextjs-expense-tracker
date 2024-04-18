"use client"

import { format } from "date-fns"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ReloadIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react";

const months = [
  {
    "name": "January",
    "short": "Jan",
    "number": "1"
  },
  {
    "name": "February",
    "short": "Feb",
    "number": "2"
  },
  {
    "name": "March",
    "short": "Mar",
    "number": "3"
  },
  {
    "name": "April",
    "short": "Apr",
    "number": "4"
  },
  {
    "name": "May",
    "short": "May",
    "number": "5"
  },
  {
    "name": "June",
    "short": "Jun",
    "number": "6"
  },
  {
    "name": "July",
    "short": "Jul",
    "number": "7"
  },
  {
    "name": "August",
    "short": "Aug",
    "number": "8"
  },
  {
    "name": "September",
    "short": "Sep",
    "number": "9"
  },
  {
    "name": "October",
    "short": "Oct",
    "number": "10"
  },
  {
    "name": "November",
    "short": "Nov",
    "number": "11"
  },
  {
    "name": "December",
    "short": "Dec",
    "number": "12"
  }
]
const years = ["2023", "2024", "2025"]

const formSchema = z.object({
  year: z.string({
    required_error: "Year is required.",
  }),
  month: z.string({
    required_error: "Month is required.",
  }),
})


const Expenses = ({ getExpenses }) => {
  const [expenses, setExpenses] = useState([])

  const onSubmit = async (values) => {
    console.log(values);
    const result = await getExpenses(values.year, values.month);
    setExpenses(result)
  }

  var totalAmount = 0;
  expenses.map(expense => {
    totalAmount += expense.amount;
  });

  let date = new Date();
  const currentYear = date.getFullYear().toString();
  const currentMonth = (date.getMonth() + 1).toString();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: currentYear,
      month: currentMonth
    },
  })
  return (
    <div id="expenses" className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-2 justify-between items-end">
          <FormField control={form.control} name="year" render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField control={form.control} name="month" render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.short} value={month.number}>{month.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
      {
        expenses ? <ExpenseTable expenses={expenses} totalAmount={totalAmount} /> : <h3 className="item-center">No Expenses</h3>
      }
    </div>
  );
};

const ExpenseTable = ({ expenses, totalAmount }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[100px]">Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.expenseId}>
            <TableCell>{expense.expenseId}</TableCell>
            <TableCell>{format(expense.expenseDate, "yyyy-MM-dd")}</TableCell>
            <TableCell className="font-medium">{expense.category}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell className="text-right font-semibold">&#2352;&#2370; {expense.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right font-bold">&#2352;&#2370; {totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Expenses;
