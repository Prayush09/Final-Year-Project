import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import AppRoutes from '@/components/AppRoutes';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="roommate-theme">
      <Router>
        <div className="bg-background w-full overflow-x-hidden">
          <Navbar />
          <main className="container w-fu">
            <AppRoutes />
          </main>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;