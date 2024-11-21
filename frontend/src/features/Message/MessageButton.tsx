import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface MessageButtonProps {
  receiverId: string;
}

export function MessageButton({ receiverId }: MessageButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/messages/${receiverId}`);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full bg-[#747bff] hover:bg-[#5b66ff] text-white"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Message
    </Button>
  );
}