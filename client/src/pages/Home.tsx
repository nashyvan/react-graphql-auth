import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const {user, logout}:any = useContext(AuthContext);

  return (
    <>
      <h1>Home page</h1>
      { user ?
        <>
          <h2>{ user.email } is logged in</h2>
        </>
      :
        <>
          <p>No user data</p>
        </>
      }
    </>
  );
};

export default Home;
