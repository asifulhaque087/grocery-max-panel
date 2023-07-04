'use client';

import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { userSideDrawerVar } from '../../graphql/reactivities/toogleVariable';
import Asidedrawer from './Asidedrawer';
import Atopbar from './Atopbar';
import { adminAuth } from '@src/hooks';

const AdminLayout = (props) => {
  // const isAuthenticated = adminAuth();
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  // if (!isAuthenticated) return null;
  return (
    <div>
      <Atopbar />
      <div className={`${userSideDrawer ? 'ml-0 md:ml-64' : 'ml-0 md:ml-0'} `}>
        <Asidedrawer {...props} />
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
