import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import AppRoutes from '@/components/AppRoutes';
import Navbar from '@/components/Navbar';
import { io } from 'socket.io-client';

// Create the SocketContext
export const SocketContext = createContext<Socket;

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Log socket connection
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    // Cleanup socket connection on unmount
    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <ThemeProvider defaultTheme="light" storageKey="roommate-theme">
        <Router>
          <div className="bg-background">
            <Navbar />
            <Toaster position="top-right" richColors closeButton />
            {/* Add padding-top equivalent to the Navbar height */}
            <main className="w-full relative pt-[72px]">
              {/* Adjust the `pt-[72px]` to match the Navbar height */}
              <AppRoutes />
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </SocketContext.Provider>
  );
}

export default App;
