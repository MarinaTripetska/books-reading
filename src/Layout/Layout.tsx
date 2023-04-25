import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';

export default function Layout() {
  const { state } = useNavigation();

  return (
    <>
      {state === 'loading' && <Loader />}

      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
