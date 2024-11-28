import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface BannerProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export function Banner({ message, actionLabel, onAction }: BannerProps) {
  return (
    <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-yellow-100 text-yellow-800"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}