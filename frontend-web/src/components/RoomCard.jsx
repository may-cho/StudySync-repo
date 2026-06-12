import React from "react";
import { Users, ChevronRight } from "lucide-react";

const RoomCard = ({ room, onJoin }) => {
  return (
    <div className="group bg-bg-card rounded-xl border border-tx-main/8 p-4 hover:border-brand-primary/20 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-base font-medium text-tx-main">{room.name}</h3>
          <p className="text-xs text-tx-muted/60 mt-0.5">{room.topic}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-medium text-green-600 dark:text-green-400">
            Live
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {room.members > 0 && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-700 flex items-center justify-center text-[9px] font-medium text-indigo-900 dark:text-indigo-100 border border-white dark:border-bg-card">
                {String.fromCharCode(65)}
              </div>
            )}
            {room.members > 1 && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-700 flex items-center justify-center text-[9px] font-medium text-indigo-900 dark:text-indigo-100 border border-white dark:border-bg-card">
                {String.fromCharCode(66)}
              </div>
            )}
            {room.members > 2 && (
              <div className="w-6 h-6 rounded-full bg-tx-main/10 flex items-center justify-center text-[9px] font-medium border border-white dark:border-bg-card">
                +{room.members - 2}
              </div>
            )}
          </div>
          <span className="text-xs text-tx-muted/50">
            {room.members} members
          </span>
        </div>
        <button
          onClick={() => onJoin?.(room.id)}
          className="px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-medium hover:bg-brand-primary/20 transition-all flex items-center gap-1"
        >
          Join
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
