import React, { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

const TaskItem = ({ task, onStatusChange }) => {
  const [completed, setCompleted] = useState(task.status === "completed");

  const priorityConfig = {
    critical: {
      label: "Critical",
      color: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300",
      icon: "🔴",
    },
    steady: {
      label: "Steady",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
      icon: "📘",
    },
    review: {
      label: "Review",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
      icon: "🟠",
    },
  };

  const config = priorityConfig[task.priority] || priorityConfig.steady;

  const handleToggle = () => {
    setCompleted(!completed);
    onStatusChange?.(task.id, !completed ? "completed" : "pending");
  };

  return (
    <div className="flex items-start justify-between py-3 border-b border-[var(--color-tx-main)]/5 last:border-0 group">
      <div className="flex items-start gap-3 flex-1">
        <button onClick={handleToggle} className="mt-0.5">
          {completed ? (
            <CheckCircle size={18} className="text-green-500" />
          ) : (
            <Circle
              size={18}
              className="text-tx-muted group-hover:text-brand-primary"
            />
          )}
        </button>

        <div className="flex-1">
          <p
            className={`text-sm font-medium leading-tight ${completed ? "line-through text-tx-muted" : "text-tx-main"}`}
          >
            {task.title}
          </p>
          <p className="text-[11px] text-tx-muted mt-0.5">{task.due_date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.color}`}
        >
          {config.label}
        </span>
        <span className="text-base">{config.icon}</span>
      </div>
    </div>
  );
};

export default TaskItem;
