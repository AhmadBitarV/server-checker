import React from "react";
import styles from "./headingSecondary.module.scss";

const headingSecondary = (props) => {
  let style = null;

  switch (props.headType) {
    case "white":
      style = styles.White;
      break;

    default:
      style = styles.Heading_Secondary;
  }

  return <h2 className={style}>{props.children}</h2>;
};

export default headingSecondary;
