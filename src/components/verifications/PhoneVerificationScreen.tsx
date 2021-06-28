import React, { FormEvent } from "react"
import { Helmet } from "react-helmet"
import styles from "./PhoneVerificationScreen.module.css"
import inputStyles from "../../styles/modules/input.module.css"
import { verification, accountVerification } from "../../api"
import { checkAuthenticated } from "../../utils/state-management-utils"
import Banner from "../shared/Banner"
import PillButton from "../shared/PillButton"
import { signup_mobile_verification_submitted } from "../../analyticsEvents"

export default class PhoneVerificationScreen extends React.Component {
  state = {
    hasSession: false,
    sessionToken: "",
    statusMessage: "",
    success: false,
    verificationCode: "",
    resendDisabled: false,
    phoneVerificationState: "Didn't get the code?",
    countDown: 0,
  }

  timer: number = 0

  componentDidMount() {
    var authTest = checkAuthenticated() // returns tuple: [isAuthenticated, authToken]
    if (authTest[0] && authTest[1]) {
      this.setState({ hasSession: authTest[0], sessionToken: authTest[1] })
    }
  }

  componentDidUpdate() {
    if (this.state.resendDisabled && this.state.countDown === 0) {
      clearInterval(this.timer)
      this.setState({
        resendDisabled: false,
      })
    }
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSumbit(e: FormEvent) {
    e.preventDefault()
    this.setState({ statusMessage: "" })
    if (this.verifyInputs()) {
      this.dispatchVerification()
    }
  }

  async dispatchVerification() {
    try {
      await verification({
        token: this.state.verificationCode,
        for: "phone",
      })
      window.analytics.track(signup_mobile_verification_submitted, {
        success: "Success",
      })
      this.setState({ success: true })
    } catch (message) {
      const errorMsg = message
        ? message
        : "Code may have expired or it's already been used."
        window.analytics.track(signup_mobile_verification_submitted, {
          failure: errorMsg,
        })
      this.setState({ statusMessage: errorMsg })
    }
  }

  verifyInputs() {
    if (
      !this.state.verificationCode ||
      this.state.verificationCode.length < 5
    ) {
      this.setState({ statusMessage: "Please enter a valid token." })
      return false
    }
    return true
  }

  resendPhoneVerification() {
    if (this.state.resendDisabled) {
      // user has recently clicked resend.
      return
    }
    this.dispatchAccountVerification("phone")
  }

  async dispatchAccountVerification(type: string) {
    try {
      await accountVerification({
        token: this.state.sessionToken,
        for: type,
      })
      this.setState({
        phoneVerificationState: "Verification text sent. ",
        resendDisabled: true,
        countDown: 30,
      })
      this.resendEnableTimer()
    } catch (message) {
      this.setState({
        phoneVerificationState: "Error sending notification.",
      })
    }
  }

  resendEnableTimer() {
    this.timer = window.setInterval(() => {
      this.setState((prevState: { countDown: number }) => {
        return {
          ...prevState,
          countDown: prevState.countDown - 1,
        }
      })
    }, 1000)
  }

  resendLink() {
    if (!this.state.resendDisabled) {
      return (
        <div className={styles.hint}>
          {this.state.phoneVerificationState}{" "}
          {this.state.hasSession && this.state.sessionToken ? (
            <a onClick={this.resendPhoneVerification.bind(this)}>
              Resend code.
            </a>
          ) : (
            <a href='/resend-verification/phone'>Resend code.</a>
          )}
        </div>
      )
    } else {
      return (
        <div className={styles.hint}>
          Request another code in: {this.state.countDown}s
        </div>
      )
    }
  }

  redirectProfile() {
    window.location.href = "/profile"
  }

  redirectLogin() {
    window.location.href = "/login#redirect-verified"
  }

  render() {
    if (this.state.success) {
      return (
        <main className={styles.phoneVerificationScreen}>
          <Helmet>
            <title>Verify Phone # | GoalMogul Web</title>
          </Helmet>
          <div className={styles.row}>
            <div className={styles.card}>
              <h1>Successfully verified!</h1>
              <div className={styles.buttonWrapper}>
                <PillButton
                  style='primary'
                  type='solid'
                  buttonText={this.state.hasSession ? "Goto Profile" : "Log In"}
                  clickHandler={
                    this.state.hasSession
                      ? this.redirectProfile
                      : this.redirectLogin
                  }
                ></PillButton>
              </div>
            </div>
          </div>
        </main>
      )
    } else {
      return (
        <main className={styles.phoneVerificationScreen}>
          <Helmet>
            <title>Verify Phone # | GoalMogul Web</title>
          </Helmet>
          <div className={styles.row}>
            <div className={styles.card}>
              <h1>Verify your phone number</h1>
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
                    htmlFor='verificationCode'
                    className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                  >
                    Enter verification code
                  </label>
                  <input
                    id='verificationCode'
                    className={inputStyles.input}
                    name='verificationCode'
                    type='text'
                    value={this.state.verificationCode}
                    onChange={this.handleInput.bind(this)}
                    placeholder='Verification code'
                    autoFocus
                    required
                  />
                  <div className={styles.buttonWrapper}>
                    <PillButton
                      style='primary'
                      type='solid'
                      buttonText='Verify'
                      clickHandler={() => {}}
                    ></PillButton>
                  </div>
                  {this.resendLink()}
                </fieldset>
              </form>
            </div>
          </div>
        </main>
      )
    }
  }
}
