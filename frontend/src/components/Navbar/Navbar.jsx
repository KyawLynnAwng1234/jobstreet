import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/job-search" },
    { name: "Profile", path: "/profile" },
    { name: "Companies", path: "/companies" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Jobseeker
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/employer"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Employer Site
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden bg-white shadow-md">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "block text-blue-600 font-semibold"
                          : "block text-gray-700 hover:text-blue-600"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* Separator line */}
                <li className="border-t my-2"></li>

                <li>
                  <NavLink
                    to="/sign-in"
                    className={({ isActive }) =>
                      isActive
                        ? "block text-blue-600 font-semibold"
                        : "block text-gray-700 hover:text-blue-600"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/employer"
                    className={({ isActive }) =>
                      isActive
                        ? "block text-blue-600 font-semibold"
                        : "block text-gray-700 hover:text-blue-600"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Employer Site
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </header>

      {/* Content top spacing to prevent overlap */}
      <div className="h-14"></div>
    </>
  );
}
