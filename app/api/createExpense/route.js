import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import prisma from "@/lib/prisma";

export async function POST(request) {
    const data = await request.json()
    try {
        // const { expenseDate, expense, category, description, amount } = req
        const result = await prisma.Expense.create({
            data: data
        })
        revalidatePath('/');
        return new NextResponse({ data: result }, { message: 'Success' }, { status: 200 })
    } catch (error) {
        console.log(error.message);
        return new NextResponse({ message: 'Internal Server Error' }, { status: 500 })
    }
}