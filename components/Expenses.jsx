

const Expenses = ({ expenses }) => {

  return (
    <div>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map(expense => (
            <tr key={expense.expenseId}>
              <td>{expense.expenseId}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Expense = ({ expenseId, description, amount, category }) => {
  return (
    <div>
      {description}
    </div>
  )
}

export default Expenses;
