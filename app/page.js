import prisma from "@/lib/prisma";
import CreateExpense from "@/components/CreateExpense";
import Expenses from "@/components/Expenses";
import { Separator } from "@/components/ui/separator"

// const expenses = [
//   {
//     expenseId: "ahida844",
//     date: "24/03/2024",
//     category: "Grocery",
//     description: "Test exp",
//     amount: "1000",
//   },
//   {
//     expenseId: "ahida89a",
//     date: "10/04/2024",
//     category: "Grocery",
//     description: "Test exp",
//     amount: "1000",
//   }
// ]
const getExpenses = async (year, month) => {
  "use server"
  const expenses = await prisma.Expense.findMany(
    {
      where: {
        AND: {
          expenseYear: year,
          expenseMonth: month
        }
      }
    }
  )
  return expenses
}

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-20 p-5">
      <CreateExpense />
      <Separator className="md:my-5 my-2" />
      <Expenses getExpenses={getExpenses} />
    </main>
  );
}
export default Home