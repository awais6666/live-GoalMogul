import React from "react"
import { Helmet } from "react-helmet"
import { RouteComponentProps } from "react-router-dom"
import styles from "./EmailVerificationScreen.module.css"
import { verification } from "../../api"
import PillButton from "../shared/PillButton"
import { checkAuthenticated } from "../../utils/state-management-utils"
interface PropsInterface extends RouteComponentProps<{ token: string }> {}

export default class EmailVerificationScreen extends React.Component<
  PropsInterface
> {
  state = {
    statusMessage: "Verifying your email...",
    success: false,
    hasSession: false,
  }

  componentDidMount() {
    if (this.verifyInputs()) {
      this.dispatchVerification()
    }
    var authTest = checkAuthenticated() // returns tuple: [isAuthenticated, authToken]
    if (authTest[0] && authTest[1]) {
      this.setState({ hasSession: authTest[0] })
    }
  }

  async dispatchVerification() {
    try {
      await verification({
        token: this.props.match.params.token,
        for: "email",
      })
      this.setState({ success: true })
    } catch (message) {
      this.setState({ statusMessage: message })
    }
  }

  verifyInputs() {
    if (
      !this.props.match.params.token ||
      this.props.match.params.token.length < 5
    ) {
      this.setState({ statusMessage: "Invalid token in URL." })
      return false
    }
    return true
  }

  redirectToResend() {
    window.location.href = "/resend-verification/email"
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
        <main className={styles.emailVerificationScreen}>
          <Helmet>
            <title>Verify your email | GoalMogul Web</title>
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
        <main className={styles.emailVerificationScreen}>
          <Helmet>
            <title>Verify your email | GoalMogul Web</title>
          </Helmet>
          <div className={styles.row}>
            <div className={styles.card}>
              <h1>{this.state.statusMessage}</h1>
              <div className={styles.buttonWrapper}>
                <PillButton
                  style='primary'
                  type='solid'
                  buttonText='Resend verification'
                  clickHandler={this.redirectToResend}
                ></PillButton>
              </div>
            </div>
          </div>
        </main>
      )
    }
  }
}
