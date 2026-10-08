import {
  CalendarDays,
  Edit3,
  Receipt,
  Trash2
} from "lucide-react";

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Transactions</p>

          <h2>Recent Expenses</h2>
        </div>

        <span className="count-badge">
          {expenses.length}
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <Receipt size={42} />

          <h3>No expenses yet</h3>

          <p>
            Add your first expense using the form.
          </p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div
              className="expense-item"
              key={expense._id}
            >
              <div className="expense-icon">
                <Receipt size={20} />
              </div>

              <div className="expense-info">
                <h3>{expense.description}</h3>

                <div className="expense-meta">
                  <span>
                    {expense.category}
                  </span>

                  <span>
                    <CalendarDays size={13} />

                    {new Date(
                      expense.date
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="expense-amount">
                <strong>
                  ₹
                  {Number(
                    expense.amount
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2
                  })}
                </strong>

                <div className="expense-actions">
                  <button
                    onClick={() => onEdit(expense)}
                    title="Edit"
                  >
                    <Edit3 size={15} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(expense._id)
                    }
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}