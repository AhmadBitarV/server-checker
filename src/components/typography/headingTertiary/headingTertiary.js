import React from "react";
import styles from "./headingTertiary.module.scss";

const headingTertiary = (props) => {
  return <h3 className={styles.HeadingTertiary}>{props.children}</h3>;
};

export default headingTertiary;
