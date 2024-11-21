import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isCurrentUser: boolean;
  timestamp: string;
}

export function MessageBubble({ content, isCurrentUser, timestamp }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex mb-4",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isCurrentUser
            ? "bg-[#747bff] text-white"
            : "bg-gray-800 text-gray-100"
        )}
      >
        <p className="break-words">{content}</p>
        <span className={cn(
          "text-xs mt-1 block",
          isCurrentUser ? "text-blue-200" : "text-gray-400"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
}
