import { LogOut, Wallet } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <Wallet size={22} />
        </div>

        <span>Expense Tracker</span>
      </div>

      <div className="nav-right">
        <span className="user-name">
          Hi, {user?.name}
        </span>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </nav>
  );
}