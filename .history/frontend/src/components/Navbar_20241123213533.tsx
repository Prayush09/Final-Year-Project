import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { toast } from "sonner";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    toast.success("Logged out successfully");
  };

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
      <Link
        to="/"
        className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      {user ? (
        <>
          <Link
            to="/matches"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Matches
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/about"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/location"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Location
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-base font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </>
      )}
    </div>
  );

  const AuthButtons = () => (
    <div className="flex items-center gap-4 flex-col md:flex-row">
      <ModeToggle />
      {user ? (
        <button
          onClick={handleLogout}
          className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-center"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-b from-[#FF1BF7] via-[#8D4DE8] to-[#00EFFF] bg-clip-text text-transparent"
          >
            Homeey
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-1 mx-6">
            <NavLinks />
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[500px] opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <NavLinks />
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <AuthButtons />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}