import React, { useState } from 'react';
import { User, MapPin, Lock, Check } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SectionContainer from '../components/SectionContainer';
import Button from '../components/Button';
import { useRocketDrop } from '../hooks/useRocketDrop';

const emptyAddress = { label: '', line1: '', city: '', state: '', zip: '', country: 'India' };

const ProfilePage = () => {
  const { currentUser, addresses, actions } = useRocketDrop();
  const [profile, setProfile] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '' });
  const [address, setAddress] = useState(emptyAddress);
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileErrors, setProfileErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const validateProfile = () => {
    const errors = {};
    if (!profile.name.trim()) errors.name = 'Full name is required';
    if (profile.phone && !/^\+?[0-9\s-]{8,15}$/.test(profile.phone.trim())) errors.phone = 'Enter a valid phone number';
    return errors;
  };

  const validateAddress = () => {
    const errors = {};
    if (!address.label.trim()) errors.label = 'Address label is required';
    if (!address.line1.trim()) errors.line1 = 'Address line is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.state.trim()) errors.state = 'State is required';
    if (!address.zip.trim()) errors.zip = 'Zip code is required';
    else if (!/^\d{4,8}$/.test(address.zip.trim())) errors.zip = 'Enter a valid zip code';
    return errors;
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwords.current) errors.current = 'Current password is required';
    if (!passwords.next) errors.next = 'New password is required';
    else if (passwords.next.length < 8) errors.next = 'New password must be at least 8 characters';
    else if (passwords.next === passwords.current) errors.next = 'New password must be different from current password';
    return errors;
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const errors = validateProfile();
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) {
      showMessage('warning', 'Please correct highlighted profile fields');
      return;
    }

    try {
      await actions.updateProfile({ name: profile.name.trim(), phone: profile.phone.trim() });
      setProfileErrors({});
      showMessage('success', 'Profile updated');
    } catch (error) {
      showMessage('error', error?.message || 'Failed to update profile');
    }
  };

  const saveAddress = async (event) => {
    event.preventDefault();
    const errors = validateAddress();
    setAddressErrors(errors);
    if (Object.keys(errors).length > 0) {
      showMessage('warning', 'Please correct highlighted address fields');
      return;
    }

    try {
      await actions.addAddress({
        ...address,
        label: address.label.trim(),
        line1: address.line1.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        zip: address.zip.trim(),
      });
      setAddress(emptyAddress);
      setAddressErrors({});
      showMessage('success', 'Address added');
    } catch (error) {
      showMessage('error', error?.message || 'Failed to add address');
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    const errors = validatePassword();
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) {
      showMessage('warning', 'Please correct highlighted password fields');
      return;
    }

    try {
      await actions.changePassword(passwords.current, passwords.next);
      setPasswords({ current: '', next: '' });
      setPasswordErrors({});
      showMessage('success', 'Password updated');
    } catch (error) {
      showMessage('error', error?.message || 'Failed to update password');
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#F8FAFC] text-[#1E1B6A]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#FFF7ED] to-[#F8FAFC] py-16 text-[#1E1B6A] border-y border-[#E5E7EB]">
          <div className="container px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#F2D3A3]/20 p-3 rounded-lg">
                <User size={32} className="text-[#F2D3A3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Your Profile</h1>
                <p className="text-slate-600">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status Message */}
        {message.text && (
          <div className="container px-4 mt-6">
            <div className={`rd-card p-4 border flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200'
                : message.type === 'warning'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <Check size={20} className={
                message.type === 'success'
                  ? 'text-emerald-600'
                  : message.type === 'warning'
                  ? 'text-amber-600'
                  : 'text-red-600'
              } />
              <p className={`font-medium ${
                message.type === 'success'
                  ? 'text-emerald-700'
                  : message.type === 'warning'
                  ? 'text-amber-700'
                  : 'text-red-700'
              }`}>{message.text}</p>
            </div>
          </div>
        )}

        {/* Profile Forms */}
        <SectionContainer
          title="Account Settings"
          subtitle="Update your personal and account information"
          className="bg-white"
        >
          <div className="grid xl:grid-cols-3 gap-8">
            {/* User Information Form */}
            <form className="rd-card p-6 space-y-4 hover:shadow-md transition-all" onSubmit={saveProfile}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#1E1B6A]/10 p-2 rounded-lg">
                  <User size={20} className="text-[#1E1B6A]" />
                </div>
                <h2 className="text-lg font-semibold text-[#1E1B6A]">User Information</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Full Name</label>
                <input
                  className={`rd-input w-full ${profileErrors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={profile.name}
                  onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your full name"
                />
                {profileErrors.name && <p className="text-xs text-red-600 mt-1">{profileErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Email</label>
                <input
                  className="rd-input w-full bg-slate-50 cursor-not-allowed"
                  value={currentUser?.email || ''}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Phone</label>
                <input
                  className={`rd-input w-full ${profileErrors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={profile.phone}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="Your phone number"
                />
                {profileErrors.phone && <p className="text-xs text-red-600 mt-1">{profileErrors.phone}</p>}
              </div>
              <Button type="submit" className="w-full">Update Profile</Button>
            </form>

            {/* Manage Addresses Form */}
            <form className="rd-card p-6 space-y-4 hover:shadow-md transition-all" onSubmit={saveAddress}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#1E1B6A]/10 p-2 rounded-lg">
                  <MapPin size={20} className="text-[#1E1B6A]" />
                </div>
                <h2 className="text-lg font-semibold text-[#1E1B6A]">Manage Addresses</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Address Label</label>
                <input
                  className={`rd-input w-full ${addressErrors.label ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={address.label}
                  onChange={(event) => setAddress((prev) => ({ ...prev, label: event.target.value }))}
                  placeholder="e.g., Home, Office"
                />
                {addressErrors.label && <p className="text-xs text-red-600 mt-1">{addressErrors.label}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Address Line</label>
                <input
                  className={`rd-input w-full ${addressErrors.line1 ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={address.line1}
                  onChange={(event) => setAddress((prev) => ({ ...prev, line1: event.target.value }))}
                  placeholder="Street address"
                />
                {addressErrors.line1 && <p className="text-xs text-red-600 mt-1">{addressErrors.line1}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#1E1B6A] mb-2">City</label>
                  <input
                    className={`rd-input w-full ${addressErrors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    value={address.city}
                    onChange={(event) => setAddress((prev) => ({ ...prev, city: event.target.value }))}
                    placeholder="City"
                  />
                  {addressErrors.city && <p className="text-xs text-red-600 mt-1">{addressErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E1B6A] mb-2">State</label>
                  <input
                    className={`rd-input w-full ${addressErrors.state ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                    value={address.state}
                    onChange={(event) => setAddress((prev) => ({ ...prev, state: event.target.value }))}
                    placeholder="State"
                  />
                  {addressErrors.state && <p className="text-xs text-red-600 mt-1">{addressErrors.state}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Zip Code</label>
                <input
                  className={`rd-input w-full ${addressErrors.zip ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={address.zip}
                  onChange={(event) => setAddress((prev) => ({ ...prev, zip: event.target.value }))}
                  placeholder="Zip code"
                />
                {addressErrors.zip && <p className="text-xs text-red-600 mt-1">{addressErrors.zip}</p>}
              </div>
              <Button type="submit" className="w-full">Add Address</Button>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-slate-500">📍 <strong>{addresses.length}</strong> saved address{addresses.length !== 1 ? 'es' : ''}</p>
              </div>
            </form>

            {/* Change Password Form */}
            <form className="rd-card p-6 space-y-4 hover:shadow-md transition-all" onSubmit={changePassword}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#1E1B6A]/10 p-2 rounded-lg">
                  <Lock size={20} className="text-[#1E1B6A]" />
                </div>
                <h2 className="text-lg font-semibold text-[#1E1B6A]">Change Password</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">Current Password</label>
                <input
                  type="password"
                  className={`rd-input w-full ${passwordErrors.current ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={passwords.current}
                  onChange={(event) => setPasswords((prev) => ({ ...prev, current: event.target.value }))}
                  placeholder="Enter current password"
                />
                {passwordErrors.current && <p className="text-xs text-red-600 mt-1">{passwordErrors.current}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E1B6A] mb-2">New Password</label>
                <input
                  type="password"
                  className={`rd-input w-full ${passwordErrors.next ? 'border-red-500 focus:ring-1 focus:ring-red-500/30' : ''}`}
                  value={passwords.next}
                  onChange={(event) => setPasswords((prev) => ({ ...prev, next: event.target.value }))}
                  placeholder="Enter new password"
                />
                {passwordErrors.next && <p className="text-xs text-red-600 mt-1">{passwordErrors.next}</p>}
              </div>
              <p className="text-xs text-slate-500">Use a strong password with mixed characters</p>
              <Button type="submit" className="w-full">Update Password</Button>
            </form>
          </div>
        </SectionContainer>

        {/* Saved Addresses Summary */}
        {addresses.length > 0 && (
          <SectionContainer
            title="Your Saved Addresses"
            subtitle={`${addresses.length} address${addresses.length !== 1 ? 'es' : ''} on file`}
            className="bg-slate-50"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((addr, index) => (
                <div key={index} className="rd-card p-4 border-l-4 border-[#1E1B6A] hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[#1E1B6A] mb-2">{addr.label || `Address ${index + 1}`}</h3>
                  <p className="text-sm text-slate-700 mb-1">{addr.line1}</p>
                  <p className="text-sm text-slate-600">{addr.city}, {addr.state} {addr.zip}</p>
                </div>
              ))}
            </div>
          </SectionContainer>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
