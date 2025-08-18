import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Backend မှ login user စစ်မယ်
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:8000/api/auth/user/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data); // backend ကပြန်လာတဲ့ user data
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout/");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/job-search" },
    { name: "Profile", path: "/profile" },
    { name: "Companies", path: "/companies" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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
          <div className="hidden md:flex items-center space-x-4 relative">
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-blue-600 font-semibold flex items-center gap-1 focus:outline-none"
                  >
                    {user.name || "AC Name"} ▼
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

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
              </>
            )}
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

                <li className="border-t my-2"></li>

                {!user ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li>
                      <span
                        className="block text-blue-600 font-semibold cursor-pointer"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        {user.name || "AC Name"} ▼
                      </span>
                      {dropdownOpen && (
                        <ul className="ml-4 space-y-2">
                          <li>
                            <NavLink
                              to="/profile"
                              className="block text-gray-700 hover:text-blue-600"
                              onClick={() => setIsOpen(false)}
                            >
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block text-gray-700 hover:text-blue-600"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
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
                  </>
                )}
              </ul>
            </div>
          </nav>
        )}
      </header>

      {/* Content spacing */}
      <div className="h-14"></div>
    </>
  );
}





// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setDropdownOpen(false);
//     navigate("/"); // logout 후 홈သို့
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Jobs", path: "/job-search" },
//     { name: "Profile", path: "/profile" },
//     { name: "Companies", path: "/companies" },
//   ];

//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Logo */}
//           <NavLink to="/" className="text-2xl font-bold text-blue-600">
//             Jobseeker
//           </NavLink>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link, index) => (
//               <NavLink
//                 key={index}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                     : "text-gray-700 hover:text-blue-600"
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Right Side Desktop */}
//           <div className="hidden md:flex items-center space-x-4 relative">
//             {!user ? (
//               <>
//                 <NavLink
//                   to="/sign-in"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                       : "text-gray-700 hover:text-blue-600"
//                   }
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/employer"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                       : "text-gray-700 hover:text-blue-600"
//                   }
//                 >
//                   Employer Site
//                 </NavLink>
//               </>
//             ) : (
//               <>
//                 {/* Dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                     className="text-blue-600 font-semibold flex items-center gap-1 focus:outline-none"
//                   >
//                     {user.name || "AC Name"} ▼
//                   </button>

//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
//                       <NavLink
//                         to="/profile"
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         Profile
//                       </NavLink>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <NavLink
//                   to="/employer"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                       : "text-gray-700 hover:text-blue-600"
//                   }
//                 >
//                   Employer Site
//                 </NavLink>
//               </>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-blue-600 focus:outline-none"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <nav className="md:hidden bg-white shadow-md">
//             <div className="container mx-auto px-4 py-2">
//               <ul className="flex flex-col space-y-2">
//                 {navLinks.map((link, index) => (
//                   <li key={index}>
//                     <NavLink
//                       to={link.path}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "block text-blue-600 font-semibold"
//                           : "block text-gray-700 hover:text-blue-600"
//                       }
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.name}
//                     </NavLink>
//                   </li>
//                 ))}

//                 <li className="border-t my-2"></li>

//                 {!user ? (
//                   <>
//                     <li>
//                       <NavLink
//                         to="/sign-in"
//                         className={({ isActive }) =>
//                           isActive
//                             ? "block text-blue-600 font-semibold"
//                             : "block text-gray-700 hover:text-blue-600"
//                         }
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Sign In
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/employer"
//                         className={({ isActive }) =>
//                           isActive
//                             ? "block text-blue-600 font-semibold"
//                             : "block text-gray-700 hover:text-blue-600"
//                         }
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Employer Site
//                       </NavLink>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li>
//                       <span
//                         className="block text-blue-600 font-semibold cursor-pointer"
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                       >
//                         {user.name || "AC Name"} ▼
//                       </span>
//                       {dropdownOpen && (
//                         <ul className="ml-4 space-y-2">
//                           <li>
//                             <NavLink
//                               to="/profile"
//                               className="block text-gray-700 hover:text-blue-600"
//                               onClick={() => setIsOpen(false)}
//                             >
//                               Profile
//                             </NavLink>
//                           </li>
//                           <li>
//                             <button
//                               onClick={handleLogout}
//                               className="block text-gray-700 hover:text-blue-600"
//                             >
//                               Logout
//                             </button>
//                           </li>
//                         </ul>
//                       )}
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/employer"
//                         className={({ isActive }) =>
//                           isActive
//                             ? "block text-blue-600 font-semibold"
//                             : "block text-gray-700 hover:text-blue-600"
//                         }
//                         onClick={() => setIsOpen(false)}
//                       >
//                         Employer Site
//                       </NavLink>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </div>
//           </nav>
//         )}
//       </header>

//       {/* Content spacing */}
//       <div className="h-14"></div>
//     </>
//   );
// }
