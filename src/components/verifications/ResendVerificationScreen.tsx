import React from "react"
import { Helmet } from "react-helmet"
import styles from "./ResendVerificationScreen.module.css"
import { getProfile, accountVerification } from "../../api"
import {
  checkAuthenticated,
  setPostAuthRedirURL,
} from "../../utils/state-management-utils"
import { RouteComponentProps } from "react-router-dom"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"

interface PropsInterface extends RouteComponentProps<{ type: string }> {}

export default class ResendVerificationScreen extends React.Component<
  PropsInterface
> {
  state = {
    hasSession: false,
    token: "",
    fetching: true,
    hasEmail: false,
    hasPhone: false,
    email: "",
    phone: "",
    emailIsVerified: false,
    phoneIsVerified: false,
    emailVerificationState: "",
    phoneVerificationState: "",
    resendDisabled: false,
    error: "",
  }

  componentDidMount() {
    var authTest = checkAuthenticated() // returns tuple: [isAuthenticated, authToken]
    if (!authTest[0]) {
      setPostAuthRedirURL(window.location.pathname) // come back here after auth
      return this.redirectLogin()
    }
    this.setState({ hasSession: authTest[0], token: authTest[1] })
  }

  componentDidUpdate() {
    if (this.state.hasSession && this.state.token && this.state.fetching) {
      this.dispatchGetProfile()
    }
  }

  async dispatchGetProfile() {
    try {
      const respJson = await getProfile({
        token: this.state.token,
      })
      const hasEmail = respJson.data.email
      const hasPhone = respJson.data.phone
      this.setState({
        fetching: false,
        hasEmail: hasEmail,
        email: hasEmail ? respJson.data.email.address : "",
        emailIsVerified: hasEmail ? respJson.data.email.isVerified : false,
        hasPhone: hasPhone,
        phone: hasPhone ? respJson.data.phone.number : "",
        phoneIsVerified: hasPhone ? respJson.data.phone.isVerified : false,
      })
    } catch (message) {
      alert(
        "Error loading profile information. Try logging in again.\n\n" + message
      )
      this.setState({
        fetching: false,
      })
    }
  }

  redirectLogin() {
    window.location.href = "/login#redirect-resend"
  }

  redirectPhoneVerification() {
    window.location.href = "/phone-verification"
  }

  resendEmailVerification() {
    this.resendVerification("email")
  }
  resendPhoneVerification() {
    this.resendVerification("phone")
  }
  resendVerification(type: string) {
    if (this.state.resendDisabled) {
      // user has recently clicked resend.
      return
    }
    this.dispatchAccountVerification(type)
  }

  async dispatchAccountVerification(type: string) {
    if (type === "email") {
      try {
        await accountVerification({
          token: this.state.token,
          for: type,
        })
        this.setState({
          resendDisabled: true,
        })
      } catch (message) {
        this.setState({
          error: "Error sending email.",
        })
      }
    }
    if (type === "phone") {
      try {
        await accountVerification({
          token: this.state.token,
          for: type,
        })
        this.setState({
          phoneVerificationState: `Verification text has been sent to ${this.state.phone}. Redirecting...`,
          resendDisabled: true,
        })
        setTimeout(this.redirectPhoneVerification, 1000)
      } catch (message) {
        this.setState({
          error: "Error sending text.",
        })
      }
    }
  }

  redirectSettings() {
    window.location.href = "/settings"
  }

  emailTemplate() {
    if (!this.state.hasEmail) {
      return (
        <div>
          <h1>
            Looks like you do not have an email associated with this account.
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Add Email'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
    if (this.state.emailIsVerified) {
      return (
        <div>
          <h1>
            Your email{" "}
            <span className={styles.userData}>{this.state.email}</span> is
            already verified!
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Update Email'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
    if (this.state.resendDisabled) {
      return (
        <div>
          <h1>
            Verification email has been sent to{" "}
            <span className={styles.userData}>{this.state.email}</span>
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='text'
              buttonText='Update Email'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>
            Your email{" "}
            <span className={styles.userData}>{this.state.email}</span> has not
            been verified!
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Send Verification Email'
              clickHandler={this.resendEmailVerification.bind(this)}
            ></PillButton>
          </div>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='text'
              buttonText='Change Email'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
  }

  phoneTemplate() {
    if (!this.state.hasPhone) {
      return (
        <div>
          <h1>
            Looks like you do not have an phone number associated with this
            account.
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Add Phone Number'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
    if (this.state.phoneIsVerified) {
      return (
        <div>
          <h1>
            Your phone number{" "}
            <span className={styles.userData}>{this.state.phone}</span> is
            already verified!
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Update Phone Number'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
    if (this.state.resendDisabled) {
      return (
        <h1>
          Verification text has been sent to{" "}
          <span className={styles.userData}>{this.state.phone}</span>.
          Redirecting...
        </h1>
      )
    } else {
      return (
        <div>
          <h1>
            Your phone number{" "}
            <span className={styles.userData}>{this.state.phone}</span> has not
            been verified!
          </h1>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Send Verification Text'
              clickHandler={this.resendPhoneVerification.bind(this)}
            ></PillButton>
          </div>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='text'
              buttonText='Change Phone Number'
              clickHandler={this.redirectSettings}
            ></PillButton>
          </div>
        </div>
      )
    }
  }

  render() {
    if (this.props.match.params.type === "email") {
      return (
        <main className={styles.resendVerificationScreen}>
          <Helmet>
            <title>Resend Phone Verification | GoalMogul Web</title>
          </Helmet>
          <div className={styles.row}>
            <div className={styles.card}>
              {this.state.error !== "" ? (
                <Banner type='error'>{this.state.error}</Banner>
              ) : null}
              {this.emailTemplate()}
            </div>
          </div>
        </main>
      )
    }
    if (this.props.match.params.type === "phone") {
      return (
        <main className={styles.resendVerificationScreen}>
          <Helmet>
            <title>Resend Email Verification | GoalMogul Web</title>
          </Helmet>
          <div className={styles.row}>
            <div className={styles.card}>
              {this.state.error !== "" ? (
                <Banner type='error'>{this.state.error}</Banner>
              ) : null}
              {this.phoneTemplate()}
            </div>
          </div>
        </main>
      )
    }
  }
}
