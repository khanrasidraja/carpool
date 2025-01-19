// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import axios from 'axios'; // Or use fetch API

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
       await axios.put(`/api/users/${userId}`, updatedProfile); // Replace with your API endpoint
       setUser(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {editMode ? (
        <ProfileForm user={user} onSave={handleSaveProfile} />
      ) : (
        <>
          <ProfileCard user={user} />
          {userId === 'my-profile' && (
            <button onClick={handleEditClick}>Edit Profile</button>
          )}
          <ReviewList userId={userId} />
            {userId !== 'my-profile' && <ReviewForm userId={userId} />}
        </>
      )}

    </div>
  );
};

export default ProfilePage;