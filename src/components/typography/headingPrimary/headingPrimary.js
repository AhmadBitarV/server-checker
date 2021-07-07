import React from "react";
import styles from "./headingPrimary.module.scss";

const headingPrimary = (props) => {
  return (
    <h1 className={styles.Heading_Primary}>
      <span className={styles.Heading_Primary__Main}>{props.productName}</span>
      <span className={styles.Heading_Primary__Sub}>{props.slogan}</span>
    </h1>
  );
};

export default headingPrimary;
