import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '@/Context/SocketContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export default function MessageInterface() {
  const { receiverId } = useParams();
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem('user_id');

  console.log(rece)
  useEffect(() => {
    if (userId && receiverId) {
      fetchMessages();
      
      if (socket) {
        socket.emit('joinRoom', userId);
        
        socket.on('newMessage', (message: Message) => {
          setMessages(prev => [...prev, message]);
          scrollToBottom();
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
      setMessages([]); // Set an empty array to avoid breaking the UI.
    } finally {
      setLoading(false);
      scrollToBottom();
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
          content,
        },
        { withCredentials: true }
      );
  
      setMessages(prev => [...prev, response.data.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      scrollToBottom();
    }
  };
  

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <Card className="border-0 rounded-none shadow-none bg-[#747bff]">
        <CardHeader className="p-4">
          <h1 className="text-xl font-semibold text-white">Messages</h1>
          {!isConnected && (
            <p className="text-sm text-red-200">Reconnecting...</p>
          )}
        </CardHeader>
      </Card>

      <ScrollArea 
        ref={scrollRef}
        className="flex-1 p-4 bg-black border-t border-gray-800"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageBubble
              key={message.id || index}
              content={message.content}
              isCurrentUser={message.senderId === userId}
              timestamp={formatTimestamp(message.timestamp)}
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