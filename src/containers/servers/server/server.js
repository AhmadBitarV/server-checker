import React from "react";
import styles from "./server.module.scss";

const server = (props) => {
  let stylesClasses = [styles.server];
  let bar = <span className={styles.server__bar}></span>;

  if (props.solid) {
    bar = null;
    stylesClasses.push(styles.solid);
  }

  return (
    <React.Fragment>
      <ul className={stylesClasses.join(" ")}>
        <li className={styles.server__infobox}>{props.name}</li>
        <li className={styles.server__infobox}>{props.distance}</li>
      </ul>
      {bar}
    </React.Fragment>
  );
};

export default server;
