import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  // TODO: Make the navbar centered
  return (
    <header className="pt-4 px-5 flex items-center">
  <div className="container flex justify-between items-center">
    {/* Logo */}
    <Link to="/" className="space-x-2">
      <span className="text-3xl font-extrabold">Homeey</span>
    </Link>

    {/* Navigation Menu */}
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className="text-lg">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Additional menu items */}
        {user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/matches" className="text-lg">Matches</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/dashboard" className="text-lg">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="text-lg">About Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>

    {/* User Actions */}
    <div className="flex items-center space-x-4">
      <ModeToggle />
      {user ? (
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      ) : (
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  </div>
</header>

  );
}
