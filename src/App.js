//#region PACKAGE IMPORTS
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//#endregion

//#region CONFIG IMPORTS
import routes from './config/routes';
//#endregion

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<span>Loading...</span>}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.name}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
          <Redirect to="/furnitures" />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
