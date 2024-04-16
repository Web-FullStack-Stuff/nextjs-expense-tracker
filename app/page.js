import CreateExpense from "@/components/CreateExpense";
import Expenses from "@/components/Expenses";



const expenses = [
  {
    expenseId: "ahida844",
    category: "Grocery",
    description: "Test exp",
    amount: "1000",
  },
  {
    expenseId: "ahida89a",
    category: "Grocery",
    description: "Test exp",
    amount: "1000",
  }
]

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateExpense />
      
      <Expenses expenses={expenses} />

    </main>
  );
}
