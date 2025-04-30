'use client';

import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile, changePassword } from '@/lib/api';
import { UserProfile } from '@/types/types';
import { Button } from '@/components/ui/button';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';
import Image from 'next/image';
import editIcon from '@/public/edit-icon.png';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phoneNumber: '',
    roles: ['Owner', 'Admin'],
    image: '/profile-image.png',
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(profile.image);
  // State to track which fields are in edit mode
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setImagePreview(userProfile.image);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...profile };
      if (imageFile) {
        updatedProfile.image = imagePreview;
      }
      await updateUserProfile(updatedProfile);
      alert('Profile updated successfully!');
      // Reset edit mode after saving
      setEditMode({ name: false, email: false, phoneNumber: false });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    try {
      await changePassword(newPassword);
      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password.');
    }
  };

  // Function to toggle edit mode for a specific field
  const toggleEditMode = (field: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="py-8 min-h-screen">
      <div className="p-6 sm:p-8 flex gap-20">
        {/* Display Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src={imagePreview}
              alt="Profile Picture"
              width={208}
              height={208}
            />
          </div>
          <label className="mt-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="inline-block bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-sm text-center font-medium rounded-[4px] w-[208px] h-[46px] px-4 py-[14.2px] cursor-pointer transition-colors duration-200">
              Change Picture
            </span>
          </label>
        </div>

        {/* Profile Form */}
        <div className="flex flex-col gap-6 w-full">
          {/* Name */}
          <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Name</label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                readOnly={!editMode.name}
                className={`w-full p-3 border border-gray-300 rounded-[5px] text-[#0E3B4C] text-sm transition-all duration-200 ${
                  editMode.name
                    ? 'focus:outline-none focus:ring-2 focus:ring-[#36C6F3]'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              <Image
                src={editIcon}
                alt="edit"
                width={20}
                height={20}
                className="absolute right-[calc(4%-24px)] transition ease-in-out duration-300 hover:transform hover:scale-[1.14] cursor-pointer"
                onClick={() => toggleEditMode('name')}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Email</label>
            <div className="relative flex items-center">
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                readOnly={!editMode.email}
                className={`w-full p-3 border border-gray-300 rounded-[5px] text-[#0E3B4C] text-sm transition-all duration-200 ${
                  editMode.email
                    ? 'focus:outline-none focus:ring-2 focus:ring-[#36C6F3]'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              <Image
                src={editIcon}
                alt="edit"
                width={20}
                height={20}
                className="absolute right-[calc(4%-24px)] transition ease-in-out duration-300 hover:transform hover:scale-[1.14] cursor-pointer"
                onClick={() => toggleEditMode('email')}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Phone Number</label>
            <div className="relative flex items-center">
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                readOnly={!editMode.phoneNumber}
                className={`w-full p-3 border border-gray-300 rounded-[5px] text-[#0E3B4C] text-sm transition-all duration-200 ${
                  editMode.phoneNumber
                    ? 'focus:outline-none focus:ring-2 focus:ring-[#36C6F3]'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              <Image
                src={editIcon}
                alt="edit"
                width={20}
                height={20}
                className="absolute right-[calc(4%-24px)] transition ease-in-out duration-300 hover:transform hover:scale-[1.14] cursor-pointer"
                onClick={() => toggleEditMode('phoneNumber')}
              />
            </div>
          </div>

          {/* Roles */}
          <div className="my-6">
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Role</label>
            <div className="flex gap-3">
              {profile.roles.map((role) => (
                <span
                  key={role}
                  className={
                    role === 'Owner'
                      ? 'bg-[#36C6F3] text-white text-[13px] font-semibold px-[15px] w-[89px] h-[34px] rounded-[19px] flex items-center justify-center'
                      : 'bg-[#0FD582] text-white text-[13px] font-semibold px-[15px] w-[89px] h-[34px] rounded-[19px] flex items-center justify-center'
                  }
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-[#0E3B4C] mb-1 font-medium">Password</label>
            <div className="relative flex items-center gap-2">
              <input
                type="password"
                value="************"
                readOnly
                className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none text-[#0E3B4C] text-sm"
              />
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="absolute right-[calc(4%-24px)] bg-[#EEF8FE] py-1 px-3 text-[#36C6F3] text-sm font-semibold transition-colors duration-200 cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="bg-[#36C6F3] hover:bg-[#2a9cbf] text-white text-[20px] font-medium rounded-[7px] px-6 py-3 mt-6 w-[285px] h-[60px] transition-colors duration-200 cursor-pointer"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleChangePassword}
      />
    </div>
  );
}