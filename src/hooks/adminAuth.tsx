'use client';
// External Imports
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// useIsBrowser
export const adminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const Router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');

    if (token) {
      let decript = jwtDecode(token) as any;
      if (decript.role === 'admin') {
        setIsAuthenticated(true);
      } else {
        Router.replace('/login');
      }
    } else {
      Router.replace('/login');
    }
  }, []);

  return isAuthenticated;
};
