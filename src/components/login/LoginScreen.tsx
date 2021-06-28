import React, { FormEvent } from "react"
import { Helmet } from "react-helmet"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./LoginScreen.module.css"
import { login } from "../../api"
import {
  createAuthenticatedSession,
  postAuthRedirOrFailover,
} from "../../utils/state-management-utils"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"
import { RouteComponentProps } from "react-router-dom"

import { signup_continue } from "../../analyticsEvents"
import { login_started, login_complete } from "../../analyticsEvents"

interface PropsInterface extends RouteComponentProps {}

/**
 * Login page. Displays a login form. A button for reset password that routes to /password-reset
 */
export default class LoginScreen extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    emailOrPhone: "",
    password: "",
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSumbit(e: FormEvent) {
    e.preventDefault()
    this.setState({ statusMessage: "" })
    if (this.verifyInputs()) {
      const emailReg = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      const email =
        (emailReg.test(this.state.emailOrPhone) && this.state.emailOrPhone) ||
        undefined
      const phone = (!email && this.state.emailOrPhone) || undefined
      this.dispatchLogin(email, phone)
    }
    return false
  }

  async dispatchLogin(email: string | undefined, phone: string | undefined) {
    try {
      const respJson = await login({
        email: email,
        phone: phone,
        password: this.state.password,
      })

      createAuthenticatedSession({
        startTime: new Date().toString(),
        token: respJson.token,
        userId: respJson.userId,

      })
      postAuthRedirOrFailover("/profile")
      if (respJson) {
        console.log(respJson)

        window.analytics.track(login_complete, {
          result: "Success",
        })
      }
      window.analytics.track(signup_continue)
    } catch (message) {
      this.setState({ statusMessage: message })
      window.analytics.track(login_complete, {
        result: "error",
        error_details: message,
      })
    }
  }

  verifyInputs() {
    if (!(this.state.emailOrPhone.length && this.state.password.length)) {
      this.setState({
        statusMessage: "Please enter both your email and password.",
      })
      return false
    }
    return true
  }

  redirectToRegister() {
    window.location.href = "/register"
  }

  redirectToResetPw() {
    window.location.href = "/password-reset"
  }

  switchTextByHash() {
    switch (this.props.location.hash) {
      case "#redirect-resend":
        return <h1>Log in to Resend Verification!</h1>
      case "#redirect-verified":
        return <h1>Account Verified!</h1>
      default:
        return <h1>Welcom Back!</h1>
    }
  }

  render() {
    return (
      <main className={styles.loginScreen}>
        <Helmet>
          <title>Log in | GoalMogul Web</title>
        </Helmet>
        <div className={styles.row}>
          <div className={styles.card}>
            {this.switchTextByHash()}
            <h2>Sign in or create an account to begin!</h2>
            <form
              className={styles.form}
              acceptCharset='utf-8'
              method='POST'
              action=''
              autoComplete='off'
              onSubmit={this.handleSumbit.bind(this)}
            >
              <fieldset>
                {this.state.statusMessage.length ? (
                  <Banner type='error'>{this.state.statusMessage}</Banner>
                ) : (
                  ""
                )}
                <label
                  htmlFor='emailOrPhone'
                  className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                >
                  Email or Phone
                </label>
                <input
                  id='emailOrPhone'
                  className={inputStyles.input}
                  name='emailOrPhone'
                  value={this.state.emailOrPhone}
                  onChange={this.handleInput.bind(this)}
                  type='text'
                  placeholder='Enter your Email or Phone'
                  required
                />
                <label
                  htmlFor='password'
                  className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                >
                  Password
                </label>
                <input
                  id='password'
                  className={`${inputStyles.input} ${styles.inputWithDetail}`}
                  name='password'
                  value={this.state.password}
                  onChange={this.handleInput.bind(this)}
                  type='password'
                  placeholder='Password'
                  required
                />
                <p id='phone-verified' className={styles.inputDetail}>
                  <a onClick={this.redirectToResetPw}>Forgot Password?</a>
                </p>
                <div className={styles.buttonWrapper}>
                  <PillButton
                    style='primary'
                    type='solid'
                    buttonText='Sign In'
                    clickHandler={() => {
                      window.analytics.track(login_started)
                    }}                  ></PillButton>
                </div>
                <div className={styles.buttonWrapper}>
                  <PillButton
                    style='primary'
                    type='text'
                    buttonText='Sign Up'
                    clickHandler={(e) => {
                      e.preventDefault()
                      this.redirectToRegister()
                    }}
                  ></PillButton>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </main>
    )
  }
}
