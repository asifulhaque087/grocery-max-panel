'use client';

import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { userSideDrawerVar } from '../../graphql/reactivities/toogleVariable';
import Asidedrawer from './Asidedrawer';
import Atopbar from './Atopbar';
import { useAuth } from '@src/hooks';

const AdminLayout = (props) => {
  const isAuthenticated = useAuth();
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  if (!isAuthenticated) return null;
  return (
    <div>
      <Atopbar />
      <div className={`${userSideDrawer ? 'ml-0 md:ml-64' : 'ml-0 md:ml-0'} `}>
        <Asidedrawer {...props} />
        <div className="bg-[rgb(248,247,250)]">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
