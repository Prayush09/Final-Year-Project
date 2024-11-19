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
    <header className="pt-4 px-5 flex justify-evenly items-center">
      <div className="container ml-5 py-3 flex justify- items-center">
        <div className="">
          <Link to="/" className="space-x-2">
            <span className="text-3xl font-extrabold">Homeey</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <span className="text-lg">Home</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/matches" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Matches</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/dashboard" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Dashboard</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/profile" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Profile</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/settings" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Settings</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">About Us</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Location</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="group h-9 w-max rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        <span className="text-lg">Contact Us</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="">
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
                    <span className="text-lg transition-colors hover:text-white">
                      Sign Up
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}