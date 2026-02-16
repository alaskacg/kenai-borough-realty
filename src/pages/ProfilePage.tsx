import { useState } from 'react';
import { User, Phone, Mail, Shield } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="card text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="font-bold text-xl mb-1">{profile?.full_name}</h2>
            <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {profile?.role === 'seller' ? 'Seller' : 'Buyer'}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="card mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="btn-secondary">
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      className="input-field"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setEditing(false)} className="btn-secondary flex-1">
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Status */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Verification Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>Email Verification</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    profile?.email_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {profile?.email_verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>Phone Verification</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    profile?.phone_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {profile?.phone_verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span>ID Verification</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    profile?.id_verification_status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {profile?.id_verification_status || 'Unverified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
