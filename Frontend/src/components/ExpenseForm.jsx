import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const initialForm = {
  amount: "",
  category: "Food",
  description: "",
  date: new Date()
    .toISOString()
    .split("T")[0]
};

export default function ExpenseForm({
  onSubmit,
  editingExpense,
  onCancel
}) {
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
        date: new Date(editingExpense.date)
          .toISOString()
          .split("T")[0]
      });
    } else {
      setForm(initialForm);
    }
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.amount ||
      !form.description ||
      !form.date
    ) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        ...form,
        amount: Number(form.amount)
      });

      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">
            {editingExpense
              ? "Update"
              : "New Transaction"}
          </p>

          <h2>
            {editingExpense
              ? "Edit Expense"
              : "Add Expense"}
          </h2>
        </div>

        {editingExpense && (
          <button
            className="icon-button"
            onClick={onCancel}
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>

          <div className="amount-input">
            <span>₹</span>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">
              Shopping
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What did you spend on?"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="primary-button full-width"
          type="submit"
          disabled={loading}
        >
          {editingExpense ? (
            <Save size={18} />
          ) : (
            <Plus size={18} />
          )}

          {loading
            ? "Saving..."
            : editingExpense
              ? "Update Expense"
              : "Add Expense"}
        </button>
      </form>
    </div>
  );
}