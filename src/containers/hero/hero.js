import React, { Component } from "react";
import styles from "./hero.module.scss";

import H1 from "../../components/typography/headingPrimary/headingPrimary";
import Button from "../../components/UI/cta_buttons/Full/CTA_Button";

import { connect } from "react-redux";

class Hero extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.header__textbox}>
          <H1
            productName={"Galaxy"}
            slogan={"Because Your Online Security Comes First"}
          />
          <Button to={this.props.isAuthentiated ? "/servers" : "/auth"}>
            Discover our servers
          </Button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthentiated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Hero);
