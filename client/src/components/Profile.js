import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <div>
            <h4>Username:</h4> <span>{user && user.name}</span>
          </div>
          <div>
            {' '}
            <h4>Email:</h4> <span>{user && user.email}</span>
          </div>
          <div>
            <img src={user && user.picture} alt='profile pic' />
          </div>
        </div>
      ) : (
        <p>Login to access your profile</p>
      )}
    </>
  );
};
export default Profile;
