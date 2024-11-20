import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Connect to the backend Socket.IO server
const socket = io('http://localhost:3000', { withCredentials: true }); // Update the URL based on your backend server

const MessageInterface = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [input, setInput] = useState(''); // State to manage user input
  const [userId] = useState(localStorage.getItem('user_id')); // Fetch user_id from local storage
  const [receiverId, setReceiverId] = useState(''); // ID of the user to chat with

  useEffect(() => {
    // Join the user's private room
    if (userId) {
      socket.emit('joinRoom', userId);
      console.log(`Joined room for user: ${userId}`);
    }

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Function to send a message
  const sendMessage = async () => {
    if (!input.trim() || !receiverId.trim()) {
      alert('Please enter a message and receiver ID!');
      return;
    }

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:3000/api/messages/send', {
        senderId: userId,
        receiverId,
        content: input,
      }, { withCredentials: true });

      // Clear the input field and update the local message list
      setMessages((prev) => [...prev, response.data.message]);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Chat Header */}
      <Card className="border-0 rounded-none shadow-none bg-[#747bff]">
        <CardHeader className="p-4">
          <h1 className="text-xl font-semibold text-white">Chat Interface</h1>
        </CardHeader>
      </Card>

      {/* Message List */}
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
          <p className="text-gray-500">No messages yet.</p>
        )}
      </ScrollArea>

      {/* Message Input */}
      <Card className="border-0 bg-black">
        <CardFooter className="p-4 flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Enter receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-500"
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
