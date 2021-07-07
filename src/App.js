import "./App.scss";

import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "./components/UI/spinner/spinner";

const Auth = React.lazy(() => import("./containers/auth/auth"));

const Servers = React.lazy(() => import("./containers/servers/servers"));

const Hero = React.lazy(() => import("./containers/hero/hero"));

function App(props) {
  let routes = (
    <Switch>
      <Route
        path="/auth"
        render={() => (
          <Suspense fallback={<Spinner />}>
            <Auth />
          </Suspense>
        )}
      />
      <Route
        path="/"
        exact
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Hero />
          </Suspense>
        )}
      />
      {/* <Route render={() => <h1>Page not found</h1>} /> */}
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthentiated) {
    routes = (
      <Switch>
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <Auth />
            </Suspense>
          )}
        />
        <Route
          path="/servers"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <Servers />
            </Suspense>
          )}
        />
        <Route
          path="/"
          exact
          component={() => (
            <Suspense fallback={<Spinner />}>
              <Hero />
            </Suspense>
          )}
        />
        {/* <Route render={() => <h1>Page not found</h1>} /> */}
      </Switch>
    );
  }

  return <div className="App">{routes}</div>;
}

const mapStateToProps = (state) => {
  return {
    isAuthentiated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(App);
