import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../components/UI/spinner/spinner";

const Auth = React.lazy(() => import("../containers/auth/auth"));
const Servers = React.lazy(() => import("../containers/servers/servers"));
const Hero = React.lazy(() => import("../containers/hero/hero"));

const Switches = () => {
  return (
    <Switch>
      <Route
        path="/"
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Hero />
          </Suspense>
        )}
        exact
      />
      <Route
        path="/auth"
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Auth />
          </Suspense>
        )}
      />
      <Route
        path="/servers"
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Servers />
          </Suspense>
        )}
      />
      {/* <Redirect to="/" /> */}
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  );
};
export default Switches;
