import React from 'react';
import AppBar from '../components/AppBar';
import SwipeList from '../components/SwipeList';

const Home = props => {
  return (
    <>
      <AppBar setToken={props.setToken} />
      <SwipeList {...props} token={props.token} setToken={props.setToken} />
    </>
  );
};
export default Home;
