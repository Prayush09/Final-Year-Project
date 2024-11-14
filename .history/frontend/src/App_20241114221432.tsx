import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import AppRoutes from '@/components/AppRoutes';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="roommate-theme">
      <Router>
        <div className=" bg-background">
          <Navbar />
          <main className="container w-full h-auto m-0 p-0">
            <AppRoutes />
          </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;