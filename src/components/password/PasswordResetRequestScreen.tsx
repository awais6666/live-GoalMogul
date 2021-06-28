import React, { FormEvent } from "react"
import { Helmet } from "react-helmet"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./PasswordResetRequestScreen.module.css"
import { pwResetRequest } from "../../api"
import Banner from "../shared/Banner"
import PillButton from "../shared/PillButton"
/**
 * A form for requesting a password reset link.
 * Takes either a phone or email
 */
export default class PasswordResetRequestScreen extends React.Component {
  state = {
    statusMessage: "",
    emailOrPhone: "",
    success: false,
    medium: "",
    destination: "",
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
      this.dispatchPwResetRequest(email, phone)
    }
    return false
  }

  async dispatchPwResetRequest(
    email: string | undefined,
    phone: string | undefined
  ) {
    try {
      await pwResetRequest({
        email: email,
        phone: phone,
      })
      const medium = email ? "an email" : "a text"
      const dest = email || phone
      this.setState({
        success: true,
        medium: medium,
        destination: dest,
      })
    } catch (message) {
      this.setState({ statusMessage: message })
    }
  }

  verifyInputs() {
    if (!this.state.emailOrPhone.length) {
      this.setState({
        statusMessage: "Please enter an email or a phone number.",
      })
      return false
    }
    return true
  }

  redirectToLogin() {
    window.location.href = "/login"
  }

  render() {
    return (
      <main className={styles.passwordResetRequestScreen}>
        <Helmet>
          <title>Request a new password | GoalMogul Web</title>
        </Helmet>
        <div className={styles.row}>
          {this.state.success ? (
            <div className={styles.card}>
              <h1>Magic Link Sent!</h1>
              <h2>
                We just sent {this.state.medium} to you at{" "}
                <span className={styles.dest}>{this.state.destination}</span>.
                <br />
                It contains a link that’ll helps you reset your password!
              </h2>
              <div className={styles.buttonWrapper}>
                <PillButton
                  style='primary'
                  type='solid'
                  buttonText='Return to Login'
                  clickHandler={this.redirectToLogin}
                ></PillButton>
              </div>
            </div>
          ) : (
            <div className={styles.card}>
              <h1>Let's find your account</h1>
              <h2>Please enter your email or phone</h2>
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
                    Email or phone
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
                  <PillButton
                    style='primary'
                    type='solid'
                    buttonText='Find Account'
                    clickHandler={() => {}}
                  ></PillButton>
                </fieldset>
              </form>
            </div>
          )}
        </div>
      </main>
    )
  }
}
