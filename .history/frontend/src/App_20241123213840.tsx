import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import AppRoutes from '@/components/AppRoutes';
import Navbar from '@/components/Navbar';

function App() {
  return (
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
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
