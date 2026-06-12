import React from "react";
import { ChevronRight, Users, Calendar, Flame } from "lucide-react";

const GroupCardElegant = ({
  group,
  hoveredId,
  setHoveredId,
  handleJoinGroup,
}) => {
  const isPending = group.application_status === "pending";

  const getButtonConfig = () => {
    if (group.is_joined) return { text: "Joined", disabled: true };
    if (isPending) return { text: "Pending", disabled: true };
    return { text: "Join discussion", disabled: false };
  };
  const config = getButtonConfig();

  return (
    <div
      className={`
        bg-bg-card
        rounded-2xl
        shadow-sm
        ${hoveredId === group.id ? "ring-1 ring-brand-primary/20" : ""}
      `}
      onMouseEnter={() => setHoveredId(group.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="p-6">
        {/* Title and badges row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-light text-tx-main tracking-tight">
                {group.name}
              </h3>
              {group.hot && (
                <span className="inline-flex items-center gap-1 text-[10px] text-orange-500 font-medium">
                  <Flame size={10} />
                  Trending
                </span>
              )}
              {group.is_joined && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  • Member
                </span>
              )}
            </div>
            <p className="text-sm text-tx-muted/70 leading-relaxed max-w-md">
              {group.description}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-2xl font-light text-tx-main">
              {group.current_member_count}
            </div>
            <div className="text-[10px] text-tx-muted uppercase tracking-wide">
              members
            </div>
          </div>
        </div>

        {/* Stats line */}
        <div className="flex items-center gap-4 text-xs text-tx-muted/60 mt-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>{group.activeNow || 6} online now</span>
          </div>
          <div className="w-px h-3 bg-tx-muted/15" />
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{group.nextSession || "Session this week"}</span>
          </div>
          {group.unread > 0 && (
            <>
              <div className="w-px h-3 bg-tx-muted/15" />
              <div className="flex items-center gap-1.5">
                <span className="text-brand-primary font-medium">
                  {group.unread}
                </span>
                <span>unread</span>
              </div>
            </>
          )}
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-5">
          {group.display_tags?.slice(0, 4).map((topic) => (
            <span key={topic} className="text-[11px] text-tx-muted/50">
              {topic}
            </span>
          ))}
          {group.display_tags?.length > 4 && (
            <span className="text-[11px] text-tx-muted/40">
              +{group.display_tags.length - 4}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-tx-main/5 pt-4 flex items-center justify-between">
          <div className="text-xs text-tx-muted/40">
            {group.is_joined ? "You're a member" : "Join the community"}
          </div>
          <button
            onClick={() => !config.disabled && handleJoinGroup(group.id)}
            disabled={config.disabled}
            className={`
              text-sm font-medium flex items-center gap-1
              ${
                !config.disabled
                  ? "text-tx-muted hover:text-brand-primary"
                  : config.text === "Joined"
                    ? "text-emerald-500/70 cursor-not-allowed"
                    : "text-amber-500/70 cursor-not-allowed"
              }
            `}
          >
            {config.text}
            {!config.disabled && <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCardElegant;
