import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../../Context/SocketContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useToast } from '..//components/ui/use-toast';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

export default function MessageInterface() {
  const { receiverId } = useParams();
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem('user_id');
  const { toast } = useToast();

  useEffect(() => {
    if (userId && receiverId) {
      fetchMessages();
      markMessagesAsRead();
      
      if (socket) {
        socket.emit('joinRoom', userId);
        
        socket.on('newMessage', (message: Message) => {
          if (message.sender_id === receiverId || message.sender_id === userId) {
            setMessages(prev => [...prev, message]);
            if (message.sender_id === receiverId) {
              markMessagesAsRead();
            }
            scrollToBottom();
          }
        });
      }
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [userId, receiverId, socket]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/conversation/${userId}/${receiverId}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/messages/mark-read',
        {
          senderId: receiverId,
          receiverId: userId
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!userId || !receiverId || !content.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/messages/send',
        {
          senderId: userId,
          receiverId,
          content: content.trim()
        },
        { withCredentials: true }
      );

      // Emit the message through socket
      if (socket) {
        socket.emit('sendMessage', response.data.message);
      }

      setMessages(prev => [...prev, response.data.message]);
      scrollToBottom();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Card className="border-0 rounded-none shadow-none bg-[#747bff]">
        <CardHeader className="p-4">
          <h1 className="text-xl font-semibold text-white">Messages</h1>
          {!isConnected && (
            <p className="text-sm text-red-200">Reconnecting...</p>
          )}
        </CardHeader>
      </Card>

      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 p-4 bg-gray-900 border-t border-gray-800"
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isCurrentUser={message.sender_id === userId}
              timestamp={formatTimestamp(message.created_at)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No messages yet. Start the conversation!
          </p>
        )}
      </ScrollArea>

      <MessageInput
        onSendMessage={sendMessage}
        disabled={!isConnected}
      />
    </div>
  );
}