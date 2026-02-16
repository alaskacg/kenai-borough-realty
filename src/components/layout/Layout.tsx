import { Outlet, Link } from 'react-router-dom';
import { Home, User, LogOut, PlusCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function Layout() {
  const { user, profile, signOut } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Kenai Borough Realty</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/search" className="text-gray-700 hover:text-primary-600 transition-colors">
                Search Properties
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">
                How It Works
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Dashboard
                  </Link>
                  {profile?.role === 'seller' && (
                    <Link to="/list-property" className="btn-primary flex items-center gap-2">
                      <PlusCircle className="w-4 h-4" />
                      List Property
                    </Link>
                  )}
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                  <button onClick={signOut} className="text-gray-700 hover:text-primary-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Kenai Borough Realty</h3>
              <p className="text-gray-400 text-sm">
                Alaska's trusted real estate marketplace with secure escrow and digital contracts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/search" className="hover:text-white">Search Properties</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link to="/signup" className="hover:text-white">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/list-property" className="hover:text-white">List Property</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">Seller Guide</Link></li>
                <li><Link to="/signup" className="hover:text-white">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Trust & Safety</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Verified Properties</li>
                <li>Secure Escrow</li>
                <li>Digital Contracts</li>
                <li>Buyer Protection</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kenai Borough Realty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
