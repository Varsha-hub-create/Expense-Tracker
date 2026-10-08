import { useEffect, useMemo, useState } from "react";
import { IndianRupee, ReceiptText } from "lucide-react";

import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";

import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpenseSummary,
  updateExpense
} from "../services/expenseService";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const [expenses, setExpenses] = useState([]);

  const [summary, setSummary] = useState([]);

  const [totalExpense, setTotalExpense] =
    useState(0);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        expensesData,
        summaryData
      ] = await Promise.all([
        getExpenses(),
        getExpenseSummary()
      ]);

      setExpenses(expensesData);

      setSummary(summaryData.summary);

      setTotalExpense(
        summaryData.totalExpense
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (
    expenseData
  ) => {
    try {
      setError("");

      if (editingExpense) {
        await updateExpense(
          editingExpense._id,
          expenseData
        );

        setEditingExpense(null);
      } else {
        await createExpense(expenseData);
      }

      await loadDashboard();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteExpense(id);

      if (editingExpense?._id === id) {
        setEditingExpense(null);
      }

      await loadDashboard();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete expense"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const expenseCount = expenses.length;

  const averageExpense = useMemo(() => {
    if (!expenseCount) {
      return 0;
    }

    return totalExpense / expenseCount;
  }, [expenseCount, totalExpense]);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <main className="dashboard-container">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">
              Personal Finance
            </p>

            <h1>Expense Dashboard</h1>

            <p>
              Track your spending and understand
              where your money goes.
            </p>
          </div>
        </div>

        {error && (
          <div className="error-message dashboard-error">
            {error}
          </div>
        )}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <IndianRupee size={20} />
            </div>

            <div>
              <span>Total Spending</span>

              <strong>
                ₹
                {totalExpense.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2
                  }
                )}
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <ReceiptText size={20} />
            </div>

            <div>
              <span>Total Transactions</span>

              <strong>{expenseCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <IndianRupee size={20} />
            </div>

            <div>
              <span>Average Expense</span>

              <strong>
                ₹
                {averageExpense.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2
                  }
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div>
            <ExpenseForm
              onSubmit={handleCreateOrUpdate}
              editingExpense={editingExpense}
              onCancel={() =>
                setEditingExpense(null)
              }
            />

            <div className="summary-mobile">
              <Summary
                summary={summary}
                totalExpense={totalExpense}
              />
            </div>
          </div>

          <ExpenseList
            expenses={expenses}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
        </section>

        <section className="summary-desktop">
          <Summary
            summary={summary}
            totalExpense={totalExpense}
          />
        </section>
      </main>
    </div>
  );
}