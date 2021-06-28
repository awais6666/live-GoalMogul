import React, { FormEvent } from "react"
import { Helmet } from "react-helmet"
import inputStyles from "../../styles/modules/input.module.css"
import { RouteComponentProps } from "react-router-dom"
import styles from "./SetPasswordScreen.module.css"
import { setPassword } from "../../api"
import Banner from "../shared/Banner"
import PillButton from "../shared/PillButton"

interface PropsInterface extends RouteComponentProps<{ token: string }> {}

/**
 * Page for entering a new password.
 * Given the token in the url, reset the password for the associated account.
 */
export default class SetPasswordScreen extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    password: "",
    success: false,
    tokenExpired: false,
    initialPwSet: false,
  }

  componentDidMount() {
    this.setState({
      initialPwSet: this.props.match.path.includes("set-password"),
    })
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSumbit(e: FormEvent) {
    e.preventDefault()
    this.setState({ statusMessage: "" })
    if (this.verifyInputs()) {
      this.dispatchSetPw()
    }
    // clear out password
    this.setState({ password: "" })
    return false
  }

  async dispatchSetPw() {
    try {
      await setPassword({
        password: this.state.password,
        token: this.props.match.params.token,
      })
      this.setState({ success: true })
    } catch (e) {
      this.setState({
        tokenExpired: true,
      })
    }
  }

  verifyInputs() {
    if (this.state.password.length < 8) {
      this.setState({
        statusMessage: "Password must be at least 8 characters.",
      })
      return false
    }
    return true
  }

  redirectToLogin() {
    window.location.href = "/login"
  }

  setPwCard() {
    return (
      <div className={styles.card}>
        <h1>Let's choose a {this.state.initialPwSet ? "" : "new"} password!</h1>
        <h2>
          Password must include at least 8 characters including
          <br />
          at least 1 number and 1 unique character.
        </h2>
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
              htmlFor='password'
              className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
            >
              {this.state.initialPwSet ? "Password" : "New Password"}
            </label>
            <input
              id='password'
              className={inputStyles.input}
              name='password'
              value={this.state.password}
              onChange={this.handleInput.bind(this)}
              type='password'
              placeholder={
                this.state.initialPwSet ? "Password" : "New Password"
              }
              required
            />
            <PillButton
              style='primary'
              type='solid'
              buttonText='Set Password'
              clickHandler={() => {}}
            ></PillButton>
          </fieldset>
        </form>
      </div>
    )
  }

  tokenExpireBanner() {
    return (
      <div className={styles.bannerWrapper}>
        <Banner type='error'>
          This link has expired. To get a new link to set your password click{" "}
          <a href='/password-reset'>here</a>.
        </Banner>
      </div>
    )
  }

  successCard() {
    return (
      <div className={styles.card}>
        {this.state.initialPwSet ? (
          <div>
            <h1>All Set!</h1>
            <h2>Your password has been successfully set!</h2>
          </div>
        ) : (
          <div>
            <h1>Reset Complete!</h1>
            <h2>Your password has been successfully reset!</h2>
          </div>
        )}
        <div className={styles.buttonWrapper}>
          <PillButton
            style='primary'
            type='solid'
            buttonText='Login'
            clickHandler={this.redirectToLogin}
          ></PillButton>
        </div>
      </div>
    )
  }

  contentTemplate() {
    if (this.state.success) {
      return this.successCard()
    } else if (this.state.tokenExpired) {
      return this.tokenExpireBanner()
    } else {
      return this.setPwCard()
    }
  }

  render() {
    return (
      <main className={styles.setPasswordScreen}>
        <Helmet>
          <title>
            {this.state.initialPwSet
              ? "Set password"
              : "Complete password reset"}{" "}
            | GoalMogul Web
          </title>
        </Helmet>
        <div className={styles.row}>{this.contentTemplate()}</div>
      </main>
    )
  }
}
