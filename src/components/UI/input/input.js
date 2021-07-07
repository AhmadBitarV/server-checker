import React from "react";
import styles from "./input.module.scss";

import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";

const input = (props) => {
  const inputFieldStyles = [styles.Input__Field];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputFieldStyles.push(styles.Invalid);
  }

  let icon = null;

  switch (props.icon) {
    case "user":
      icon = <AiOutlineUser className={styles.Input__Icon} />;
      break;
    case "email":
      icon = <AiOutlineMail className={styles.Input__Icon} />;
      break;
    case "password":
      icon = <RiLockPasswordLine className={styles.Input__Icon} />;
      break;
    case "confirm_Password":
      icon = <RiLockPasswordFill className={styles.Input__Icon} />;
      break;

    default:
      icon = null;
  }

  return (
    <div className={styles.Input}>
      {icon}
      <input
        type={props.type}
        autoFocus={props.autoFocus}
        value={props.value}
        onChange={props.changed}
        className={inputFieldStyles.join(" ")}
        placeholder={props.placeholder}
        // {...props}
      />
      <span className={styles.Input__Bar}></span>
    </div>
  );
};

export default input;
