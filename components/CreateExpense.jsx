"use client"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { format } from "date-fns"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

import { ReloadIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


const formSchema = z.object({
    category: z.string({
        required_error: "Please select an category to display.",
    }),
    expenseDate: z.date({
        required_error: "Expense date is required.",
    }),
    description: z.string({
        required_error: "Please provide expense description."
    }).min(2, {
        message: "Description must be at least 2 characters.",
    }),
    amount: z.coerce.number().min(1, {
        message: "Amount must be more than 0"
    }),
})

const CreateExpense = () => {
    const [formOpen, setFormOpen] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const router = useRouter();


    const displayToast = (type, description) => {
        if (type === "error") {
            toast.error("Uh oh! Something went wrong.", {
                description: description,
            })
        } else if (type === "success") {
            console.log(description);
            toast.success("Success.", {
                description: description,
            })
        }
    }

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values) => {
        setFormLoading(true)
        console.log(values)
        const expDate = values.expenseDate
        const expenseYear = expDate.getFullYear().toString()
        const expenseMonth = (expDate.getMonth()+1).toString()
        
        values.expenseYear = expenseYear
        values.expenseMonth = expenseMonth
        try {
            const response = await fetch('/api/createExpense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log("Status:",response.status);
            if (response.status == "200") {
                form.reset()
                displayToast("success","Expense added successfully.")
                router.refresh()
            } else {
                displayToast("error", response.message)
            }
        } catch (error) {
            console.log("Error:", error.message);
            setFormLoading(false)
            setFormOpen(false)
            displayToast("error", error.message)
        }
        setFormLoading(false)
        setFormOpen(false)

        // setTimeout(() => {
        //     setFormLoading(false)
        //     setFormOpen(false)
        //     form.reset()
        // }, 7000)

    }
    return (
        <div>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-700">Create</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <FormField control={form.control} name="expenseDate" render={({ field }) => (
                                    <FormItem className="flex flex-col ">
                                        <FormLabel className="text-left">Expense Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        disabled={formLoading}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-left" />
                                    </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="category" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-left">Category</FormLabel>
                                        <Select id="category" onValueChange={field.onChange} defaultValue={field.value} disabled={formLoading}>
                                            <FormControl>
                                                <SelectTrigger className="w-[240px]">
                                                    <SelectValue placeholder="Select a Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Grocery">Grocery</SelectItem>
                                                <SelectItem value="Transportation">Transportation</SelectItem>
                                                <SelectItem value="Rent">Rent</SelectItem>
                                                <SelectItem value="Electricity">Electricity</SelectItem>
                                                <SelectItem value="Water">Water</SelectItem>
                                                <SelectItem value="Others">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-left" />
                                    </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-left">Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Type expense description" {...field} disabled={formLoading} />
                                        </FormControl>
                                        <FormMessage className="text-left" />
                                    </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="amount" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="ml-0 text-left">Amount(NPR)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Type expense amount" {...field} disabled={formLoading} />
                                        </FormControl>
                                        <FormMessage className="text-left" />
                                    </FormItem>
                                )}
                                />
                                <DialogFooter>
                                    {formLoading
                                        ? <Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>
                                        : <Button type="submit">Submit</Button>
                                    }
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}


export default CreateExpense;
