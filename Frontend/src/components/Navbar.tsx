import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            FoodDelivery
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/menu" className="text-gray-700 hover:text-orange-600">
              Menu
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Orders
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-orange-600"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600"
                >
                  <User className="w-6 h-6" />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-orange-600"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;