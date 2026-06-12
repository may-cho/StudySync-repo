import React from "react";
import { Users } from "lucide-react";

const RoomCard = ({ room, onJoin }) => {
  const maxAvatars = 3;
  const visibleMembers = room.members?.slice(0, maxAvatars) || [];
  const remaining = (room.members?.length || 0) - maxAvatars;

  return (
    <div className="card p-4 hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-base truncate flex-1 text-tx-main">
          {room.name}
        </h3>
        {room.is_live && (
          <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-red-600 dark:text-red-400">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {visibleMembers.map((member, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-700 flex items-center justify-center text-[11px] font-bold text-indigo-900 dark:text-indigo-100 border-2 border-white dark:border-[var(--color-bg-card)]"
              title={member.name || member}
            >
              {(member.name || member).charAt(0).toUpperCase()}
            </div>
          ))}
          {remaining > 0 && (
            <div className="w-7 h-7 rounded-full bg-[var(--color-tx-main)]/10 flex items-center justify-center text-[11px] font-medium border-2 border-white dark:border-[var(--color-bg-card)]">
              +{remaining}
            </div>
          )}
        </div>

        <button
          onClick={() => onJoin?.(room.id)}
          className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-all text-xs font-medium"
        >
          Join
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-tx-muted">
        <Users size={12} />
        <span>{room.members?.length || 0} members studying</span>
      </div>
    </div>
  );
};

export default RoomCard;
