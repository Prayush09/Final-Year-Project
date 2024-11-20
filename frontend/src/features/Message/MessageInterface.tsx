import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const socket = io('http://localhost:3000', { withCredentials: true });

const MessageInterface = () => {
  const { receiverId } = useParams(); // Get receiverId from URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId] = useState(localStorage.getItem('user_id'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId && receiverId) {
      // Join user's room
      socket.emit('joinRoom', userId);
      
      // Fetch conversation history
      fetchMessages();

      // Listen for new messages
      socket.on('newMessage', (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.off('newMessage');
    };
  }, [userId, receiverId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/conversation/${userId}/${receiverId}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post('http://localhost:3000/api/messages/send', {
        senderId: userId,
        receiverId,
        content: input,
      }, { withCredentials: true });

      setMessages((prev) => [...prev, response.data.message]);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Card className="border-0 rounded-none shadow-none bg-[#747bff]">
        <CardHeader className="p-4">
          <h1 className="text-xl font-semibold text-white">Chat</h1>
        </CardHeader>
      </Card>

      <ScrollArea className="flex-1 p-4 bg-black border-t border-gray-800">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "mb-2 p-3 rounded-lg text-sm max-w-xs break-words",
                msg.senderId === userId
                  ? "bg-[#747bff] text-white ml-auto"
                  : "bg-gray-800 text-white mr-auto"
              )}
            >
              <strong>{msg.senderId === userId ? "You" : "Them"}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </ScrollArea>

      <Card className="border-0 bg-black">
        <CardFooter className="p-4">
          <div className="flex gap-2 w-full">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-800 text-white placeholder-gray-500"
            />
            <Button
              onClick={sendMessage}
              className="bg-[#747bff] text-white hover:bg-[#5b66ff]"
            >
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessageInterface;