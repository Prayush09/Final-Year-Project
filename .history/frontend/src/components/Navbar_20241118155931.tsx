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

  return (
    <header className="bg-background border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold">Homeey</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="text-lg font-medium hover:text-accent-foreground">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {user ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/matches" className="text-lg font-medium hover:text-accent-foreground">
                      Matches
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/dashboard" className="text-lg font-medium hover:text-accent-foreground">
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/profile" className="text-lg font-medium hover:text-accent-foreground">
                      Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/settings" className="text-lg font-medium hover:text-accent-foreground">
                      Settings
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/about-us" className="text-lg font-medium hover:text-accent-foreground">
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/location" className="text-lg font-medium hover:text-accent-foreground">
                      Location
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/contact-us" className="text-lg font-medium hover:text-accent-foreground">
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions (Mode Toggle and Auth Buttons) */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <Button variant="destructive" onClick={logout}>
              <span className="text-lg">Logout</span>
            </Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">
                  <span className="text-lg">Login</span>
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  <span className="text-lg">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
