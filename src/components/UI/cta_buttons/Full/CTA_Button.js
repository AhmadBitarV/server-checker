import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CTA_Button.module.scss";

const cta_button = (props) => {
  return (
    <NavLink className={styles.Anchor} to={props.to} type={props.btnType}>
      {props.children}
    </NavLink>
  );
};

export default cta_button;
