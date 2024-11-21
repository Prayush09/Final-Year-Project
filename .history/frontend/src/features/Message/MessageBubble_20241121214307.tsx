
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
        "flex flex-col mb-4",
        isCurrentUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isCurrentUser
            ? "bg-[#747bff] text-white"
            : "bg-gray-800 text-white"
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
    </div>
  );
}