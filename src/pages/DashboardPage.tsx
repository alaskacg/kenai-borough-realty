import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, DollarSign, Heart } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

export default function DashboardPage() {
  const { user, profile } = useAuthStore();
  const [stats, setStats] = useState({
    properties: 0,
    offers: 0,
    transactions: 0,
    favorites: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    const isSeller = profile?.role === 'seller';

    // Fetch stats
    const [propertiesRes, offersRes, transactionsRes, favoritesRes] = await Promise.all([
      isSeller ? supabase.from('properties').select('id', { count: 'exact' }).eq('seller_id', user.id) : Promise.resolve({ count: 0 }),
      supabase.from('offers').select('id', { count: 'exact' })[isSeller ? 'eq' : 'eq'](isSeller ? 'seller_id' : 'buyer_id', user.id),
      supabase.from('transactions').select('id', { count: 'exact' })[isSeller ? 'eq' : 'eq'](isSeller ? 'seller_id' : 'buyer_id', user.id),
      supabase.from('favorites').select('id', { count: 'exact' }).eq('user_id', user.id),
    ]);

    setStats({
      properties: propertiesRes.count || 0,
      offers: offersRes.count || 0,
      transactions: transactionsRes.count || 0,
      favorites: favoritesRes.count || 0,
    });

    // Fetch recent activity
    const { data: offers } = await supabase
      .from('offers')
      .select('*, property:properties(title)')
      [isSeller ? 'eq' : 'eq'](isSeller ? 'seller_id' : 'buyer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    setRecentActivity(offers || []);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to view your dashboard</p>
      </div>
    );
  }

  const isSeller = profile?.role === 'seller';

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name}!</h1>
          <p className="text-gray-600">
            {isSeller ? 'Manage your properties and track offers' : 'Track your offers and favorite properties'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {isSeller && (
            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.properties}</p>
                  <p className="text-sm text-gray-600">Properties</p>
                </div>
              </div>
            </div>
          )}
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.offers}</p>
                <p className="text-sm text-gray-600">Offers</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.transactions}</p>
                <p className="text-sm text-gray-600">Transactions</p>
              </div>
            </div>
          </div>
          {!isSeller && (
            <div className="card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.favorites}</p>
                  <p className="text-sm text-gray-600">Favorites</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {isSeller ? (
                <>
                  <Link to="/list-property" className="btn-primary block text-center">
                    List New Property
                  </Link>
                  <Link to="/search" className="btn-secondary block text-center">
                    Browse Properties
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/search" className="btn-primary block text-center">
                    Search Properties
                  </Link>
                  <Link to="/profile" className="btn-secondary block text-center">
                    Edit Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((offer) => (
                  <div key={offer.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{offer.property?.title}</p>
                      <p className="text-sm text-gray-600">
                        ${offer.offer_amount.toLocaleString()} • {offer.status}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(offer.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
