import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  Trophy,
  Video,
  UsersRound,
} from "lucide-react";

const Sidebar = ({ darkMode, setDarkMode, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/study-rooms", icon: Video, label: "Study Rooms" }, // Video icon for live rooms
    { path: "/study-groups", icon: UsersRound, label: "Study Groups" }, // UsersRound for communities
    { path: "/schedule", icon: Calendar, label: "Schedule" },
    { path: "/tasks", icon: MessageSquare, label: "Tasks" },
    { path: "/resources", icon: BookOpen, label: "Resources" },
    { path: "/achievements", icon: Trophy, label: "Achievements" },
  ];

  return (
    <aside className="w-16 flex flex-col items-center justify-between py-5 bg-[var(--color-bg-card)] border-r border-[var(--color-tx-main)]/5 transition-colors duration-500">
      {/* Logo */}
      <div className="relative group">
        <Link
          to="/dashboard"
          className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center shadow-sm transition-all duration-200"
        >
          <span className="text-white font-bold text-sm">SS</span>
        </Link>
        <span className="absolute left-full ml-2 px-2 py-1 bg-[var(--color-bg-card)] text-tx-main text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-sm border border-[var(--color-tx-main)]/5 pointer-events-none">
          Home
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-tx-muted/70 hover:text-tx-main hover:bg-[var(--color-tx-main)]/5"
                }`}
              >
                <item.icon size={18} />
              </Link>
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 bg-[var(--color-bg-card)] text-tx-main text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-sm border border-[var(--color-tx-main)]/5 pointer-events-none">
                {item.label}
              </span>
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-primary"></span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-tx-muted/70 hover:text-tx-main hover:bg-[var(--color-tx-main)]/5 transition-all duration-200"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span className="absolute left-full ml-2 px-2 py-1 bg-[var(--color-bg-card)] text-tx-main text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-sm border border-[var(--color-tx-main)]/5 pointer-events-none">
            {darkMode ? "Light mode" : "Dark mode"}
          </span>
        </div>

        <div className="relative group">
          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
          >
            <LogOut size={16} />
          </button>
          <span className="absolute left-full ml-2 px-2 py-1 bg-[var(--color-bg-card)] text-red-500 text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-sm border border-red-500/10 pointer-events-none">
            Sign out
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
