import React from "react";
import { Calendar, Flame, TrendingUp } from "lucide-react";

const StreakGrid = ({
  streakData = [],
  currentStreak = 0,
  totalActive = 0,
}) => {
  const getIntensityClass = (count) => {
    if (!count || count === 0) return "bg-[var(--color-tx-main)]/10";
    if (count === 1) return "bg-brand-primary/20 hover:bg-brand-primary/30";
    if (count === 2) return "bg-brand-primary/40 hover:bg-brand-primary/50";
    if (count === 3) return "bg-brand-primary/60 hover:bg-brand-primary/70";
    return "bg-brand-primary hover:bg-brand-primary/90";
  };

  // Generate dummy data if none provided
  const displayData =
    streakData.length > 0
      ? streakData
      : Array(35)
          .fill()
          .map((_, i) => ({
            date: new Date(Date.now() - (34 - i) * 86400000)
              .toISOString()
              .split("T")[0],
            count: Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0,
          }));

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="card p-4">
      {/* Header with flame animation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Flame size={18} className="text-orange-500" />
            <div className="absolute inset-0 animate-ping opacity-75">
              <Flame size={18} className="text-orange-500" />
            </div>
          </div>
          <h3 className="font-semibold text-sm text-tx-main">Study Streak</h3>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-1 rounded-full">
          <TrendingUp size={12} className="text-orange-500" />
          <span className="text-brand-primary font-bold text-lg">
            {currentStreak || 12}
          </span>
          <span className="text-xs text-tx-muted">days</span>
        </div>
      </div>

      {/* Contribution grid with labels */}
      <div className="overflow-x-auto">
        <div className="min-w-[280px]">
          {/* Month labels */}
          <div className="flex justify-between text-[10px] text-tx-muted mb-1 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {displayData.slice(-35).map((day, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-md ${getIntensityClass(day.count)} transition-all hover:scale-110 cursor-help relative group`}
                title={`${day.date}: ${day.count} ${day.count === 1 ? "contribution" : "contributions"}`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[var(--color-bg-card)] text-tx-main text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-[var(--color-tx-main)]/10 pointer-events-none">
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          {/* Day labels */}
          <div className="flex justify-between text-[10px] text-tx-muted mt-1 px-1">
            {weekDays.map((day) => (
              <span key={day} className="w-6 text-center">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[var(--color-tx-main)]/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-[var(--color-tx-main)]/10"></div>
            <div className="w-3 h-3 rounded-sm bg-brand-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-brand-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-brand-primary/60"></div>
            <div className="w-3 h-3 rounded-sm bg-brand-primary"></div>
          </div>
          <span className="text-[10px] text-tx-muted">Less → More</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-tx-muted" />
          <p className="text-[10px] text-tx-muted">
            {totalActive || displayData.filter((d) => d.count > 0).length}{" "}
            active days
          </p>
        </div>
      </div>

      {/* Motivation message */}
      {currentStreak >= 7 && (
        <div className="mt-3 p-2 rounded-[var(--radius-xl)] bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-center">
          <p className="text-[10px] text-amber-600 dark:text-amber-400">
            🔥 Amazing! You've studied for {currentStreak} days in a row!
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakGrid;
