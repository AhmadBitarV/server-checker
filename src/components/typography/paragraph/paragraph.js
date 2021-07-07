import React from "react";
import styles from "./paragraph.module.scss";

const paragraph = (props) => {
  return <p className={styles.Paragraph}>{props.children}</p>;
};

export default paragraph;
