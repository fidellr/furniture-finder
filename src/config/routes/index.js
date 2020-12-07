//#region PACKAGE IMPORTS
import React from 'react';
//#endregion

const routes = [
  {
    name: 'Furniture List',
    exact: true,
    path: '/furniture-finder/furnitures',
    component: React.lazy(() => import('../../pages/FurnitureList')),
  },
];

export default routes;
