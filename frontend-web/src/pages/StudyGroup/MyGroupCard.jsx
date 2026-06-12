import React from "react";
import {
  ChevronRight,
  Users,
  Calendar,
  Flame,
  MessageCircle,
  Clock,
  Award,
} from "lucide-react";

const MyGroupCard = ({ group, hoveredId, setHoveredId, handleViewGroup }) => {
  return (
    <div
      className={`
        group
        bg-bg-card
        rounded-xl
        border border-tx-main/8
        transition-all duration-200
        ${hoveredId === group.id ? "border-brand-primary/30 shadow-sm" : "hover:border-tx-main/12"}
      `}
      onMouseEnter={() => setHoveredId(group.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <span className="text-base font-medium text-brand-primary/70">
                {group.name.charAt(0)}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-tx-main">
                  {group.name}
                </h3>
                {group.hot && (
                  <span className="flex items-center gap-0.5 text-[9px] text-orange-500">
                    <Flame size={8} />
                    trending
                  </span>
                )}
                {group.unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-medium">
                    {group.unread} new
                  </span>
                )}
              </div>
              <p className="text-xs text-tx-muted/60 mt-0.5 line-clamp-1">
                {group.description}
              </p>
            </div>
          </div>

          {/* Member Count */}
          <div className="text-right">
            <div className="text-lg font-semibold text-tx-main">
              {group.current_member_count}
            </div>
            <div className="text-[9px] text-tx-muted/40 uppercase">members</div>
          </div>
        </div>

        {/* Stats Row - 4 items */}
        <div className="flex items-center justify-between py-3 mb-3 border-y border-tx-main/5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-tx-muted/60">
              {group.activeNow || 8} online
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-tx-muted/40" />
            <span className="text-xs text-tx-muted/60">
              {group.nextSession?.split(",")[0] || "Today"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-tx-muted/40" />
            <span className="text-xs text-tx-muted/60">
              {group.totalStudyHours || 24} hrs
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Award size={12} className="text-tx-muted/40" />
            <span className="text-xs text-tx-muted/60">
              {group.streakDays || 12}d streak
            </span>
          </div>
        </div>

        {/* Topics */}
        {group.display_tags && group.display_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {group.display_tags.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-full bg-tx-main/5 text-tx-muted/50 text-[9px]"
              >
                {topic}
              </span>
            ))}
            {group.display_tags.length > 4 && (
              <span className="px-2 py-0.5 rounded-full bg-tx-main/5 text-tx-muted/40 text-[9px]">
                +{group.display_tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Progress Bar - subtle */}
        {group.progress && (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-tx-muted/50 mb-1">
              <span>Progress</span>
              <span>{group.progress}%</span>
            </div>
            <div className="w-full h-1 bg-tx-main/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full"
                style={{ width: `${group.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => handleViewGroup(group.id)}
          className="w-full py-2 rounded-lg bg-tx-main/5 text-tx-main text-sm font-medium hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-1"
        >
          <span>Continue Learning</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default MyGroupCard;
