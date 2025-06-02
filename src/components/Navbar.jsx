import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const { isAuthenticated, login, register, logout, user } = useKindeAuth();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setIsVisible(window.scrollY <= lastScrollY);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProtectedRoute = (route) => {
    if (!isAuthenticated) {
      login();
    } else {
      navigate(route);
    }
  };

  return (
    <nav
      className={`bg-gray-50 shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">CRM Xeno</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <NavLink to="/" text="Home" />
              <button
                onClick={() => handleProtectedRoute("/customers")}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-blue-600 transition duration-300"
              >
                Customers
              </button>
              <button
                onClick={() => handleProtectedRoute("/campaigns")}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-blue-600 transition duration-300"
              >
                Campaigns
              </button>
              <button
                onClick={() => navigate('/analytics')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-blue-600 transition duration-300"
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center text-sm rounded-full focus:outline-none"
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <FiUser size={16} />
                    </div>
                  )}
                  <span className="ml-2 hidden md:inline text-gray-700 font-medium">
                    {user.given_name || user.first_name || "User"}
                  </span>
                </button>

                {showUserDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      {/* <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link> */}
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-2" /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // login/register buttons...

              <>
                <button
                  onClick={login}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hidden md:block"
                >
                  Login
                </button>
                {/* Optional Register Button */}
                <button
                  onClick={register}
                  className="ml-2 px-4 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-gray-300 hidden md:block"
                >
                  Sign Up
                </button>
              </>
            )}

            <div className="md:hidden ml-4 flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/" text="Home" />
          <button
            onClick={() => handleProtectedRoute("/customers")}
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
          >
            Customers
          </button>
          <button
            onClick={() => handleProtectedRoute("/campaigns")}
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
          >
            Campaigns
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
          >
            Analytics
          </button>
          {isAuthenticated ? (
            <>
              <MobileNavLink to="/profile" text="Profile" />
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-blue-600 transition duration-300"
  >
    {text}
  </Link>
);

const MobileNavLink = ({ to, text }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
  >
    {text}
  </Link>
);

export default Navbar;
