import React, { Component } from "react";
import styles from "./auth.module.scss";

import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import H3 from "../../components/typography/headingTertiary/headingTertiary";
import P from "../../components/typography/paragraph/paragraph";
import Input from "../../components/UI/input/input";
import Spinner from "../../components/UI/spinner/spinner";
import { FaTelegramPlane } from "react-icons/fa";

class Auth extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        userName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Username",
            icon: "user",
            ctrName: "username",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },

        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password",
            icon: "password",
            ctrName: "password",
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
          },
          valid: false,
          touched: false,
        },
      },
    };
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.userName.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        autoFocus={
          formElement.config.elementConfig.ctrName === "username" ? true : false
        }
        icon={formElement.config.elementConfig.icon}
        key={formElement.id}
        placeholder={formElement.config.elementConfig.placeholder}
        // configrations={formElement.config.elementConfig}
        value={formElement.config.value}
        // elementConfig={formElement.config.elementConfig}
        type={formElement.config.elementConfig.type}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let signUpCart = null;
    signUpCart = signUpCart = (
      <div className={styles.SignUpForm__Container}>
        <div className={styles.SignUpForm__Heading}>
          <H3>Sign In</H3>
        </div>

        <form className={styles.SignUpForm__Form} onSubmit={this.submitHandler}>
          {form}

          <div className={styles.SignUpForm__Button}>
            <button
              disabled={
                this.state.controls.userName.value.length < 5 ||
                this.state.controls.password.value.length < 5
                  ? true
                  : false
              }
            >
              <FaTelegramPlane className={styles.SignUpForm__Button__icon} />
            </button>
          </div>

          <div className={styles.SignUpForm__Message}>
            <P> Log in with your account to proceed</P>
          </div>
        </form>
      </div>
    );

    if (this.props.loading) {
      signUpCart = <Spinner />;
    }

    let authRedirect = null;

    if (this.props.isAuthentiated) {
      authRedirect = <Redirect to="/servers" />;
    }

    return (
      <div className={styles.AuthPage}>
        {authRedirect}

        <div className={styles.SignUpForm}>{signUpCart}</div>
        <div className={styles.AuthPage__Image}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthentiated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userName, password) => dispatch(actions.auth(userName, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
