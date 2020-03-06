import React from 'react';
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import router from "./router";

export default function App( props ) {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          { router.map( ( route, idx ) =>
            ( <Route
              key={ idx }
              path={ route.path }
              exact={ route.exact }
              name={ route.name }
              render={ props => <route.component { ...props } /> }
            />
            )
          ) }
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}   