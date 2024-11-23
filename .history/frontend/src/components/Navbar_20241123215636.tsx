import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const {logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/'); 
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            to="/"
            className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <span className="text-lg">Home</span>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      {user ? (
        <>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/matches"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Matches</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/dashboard"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Dashboard</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/profile"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Profile</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/settings"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Settings</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      ) : (
        <>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/about"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">About Us</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/location"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Location</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/contact"
                className="group h-9 w-max rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-lg">Contact Us</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      )}
    </>
  );

  const AuthButtons = ({ isMobile = false }) => (
    <div className={`flex items-center ${isMobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
      <ModeToggle />
      {user ? (
        <Button variant="destructive" onClick={handleLogout}>
          <span className="text-lg">Logout</span>
        </Button>
      ) : (
        <>
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
        </>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="py-3 px-5 w-full container mx-auto flex justify-between items-center dark:bg-background bg-white pb-2 overflow-hidden">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-b from-[#FF1BF7] via-[#8D4DE8] to-[#00EFFF] bg-clip-text text-transparent"
          >
            Homeey
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex space-x-4 ml-16">
            <NavLinks />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              {isOpen ? (
                <X className="h-6 w-6 " />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <NavigationMenu className="flex-col items-start w-full">
                <NavigationMenuList className="flex-col space-y-2 w-full">
                  <NavLinks isMobile />
                </NavigationMenuList>
              </NavigationMenu>
              <div className="pt-4 border-t">
                <AuthButtons isMobile />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}