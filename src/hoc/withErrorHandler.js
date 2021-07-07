import React, { Component } from "react";

import styles from "./withErrorHandler.module.scss";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      let errorMessage = null;

      if (this.state.error) {
        switch (this.state.error.response.status) {
          case 401:
            errorMessage = (
              <p className={styles.ErrorMessage}>Wrong Password or UserName</p>
            );
            break;

          case 500:
            errorMessage = (
              <p className={styles.ErrorMessage}>
                We couldn't connect to the website.&nbsp; Please check your
                internet connection and try again
              </p>
            );
            break;

          default:
            errorMessage = (
              <p className={styles.ErrorMessage}>
                Something went Wrong + {this.state.error.message}
              </p>
            );
            break;
        }
      }

      return (
        <div>
          {errorMessage}
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withErrorHandler;
