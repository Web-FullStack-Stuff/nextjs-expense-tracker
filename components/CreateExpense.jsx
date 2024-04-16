"use client"

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"

const formSchema = z.object({
    category: z.string({
        required_error: "Please select an category to display.",
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

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            amount: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        setFormLoading(true)
        setTimeout(() => {
            console.log(values)
            form.reset()
            setFormLoading(false)
            setFormOpen(false)
        }, 7000)
        //push to db

    }
    return (
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField control={form.control} name="category" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={formLoading}>
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type expense description" {...field} disabled={formLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount(NPR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Type expense amount" {...field} disabled={formLoading} />
                                    </FormControl>
                                    <FormMessage />
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
    );
}


export default CreateExpense;
