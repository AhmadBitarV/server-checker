import React, { Component } from "react";
import styles from "./servers.module.scss";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "axios";

import Server from "./server/server";
import H2 from "../../components/typography/headingSecondary/headingSecondary";
import P from "../../components/typography/paragraph/paragraph";
import Spinner from "../../components/UI/spinner/spinner";

export class Servers extends Component {
  componentDidMount() {
    this.props.onFetchServers(this.props.token);
  }

  render() {
    let redirector = <Redirect to="/auth" />;

    if (this.props.isAuthentiated) {
      redirector = null;
    }

    let servers = <Spinner />;

    if (
      !this.props.loading &&
      this.props.isAuthentiated &&
      this.props.servers.length !== 0
    ) {
      servers = this.props.servers.map((server) => {
        return (
          <Server
            key={server.id}
            name={server.name}
            location={server.location}
            distance={server.distance}
          />
        );
      });
    }

    return (
      <div className={styles.servers}>
        {redirector}
        <div className={styles.servers__heading}>
          <H2 headType="white">Choose what's best for you</H2>
        </div>

        <div className={styles.servers__area}>
          <div className={styles.servers__label}>
            <P>
              Sort by: &nbsp;
              <span onClick={this.props.onSortServersByName}>Name</span>/
              <span onClick={this.props.onSortServersByDistance}>Distance</span>
            </P>
          </div>

          <Server name="Server Name" distance="Distance" solid />

          {servers}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.servers.servers,
    loading: state.servers.loading,
    token: state.auth.token,
    isAuthentiated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchServers: (token) => dispatch(actions.fetchServers(token)),
    onSortServersByName: () => dispatch(actions.sortServersByName()),
    onSortServersByDistance: () => dispatch(actions.sortServersByDistance()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Servers, axios));
