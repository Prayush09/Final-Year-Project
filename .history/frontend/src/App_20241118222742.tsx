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
            <div className="fixed top-0 left-0 w-full z-50">
              <Navbar />
            </div>
            <main className="w-full relative pt-[navbar_height]">
              <AppRoutes />
            </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;