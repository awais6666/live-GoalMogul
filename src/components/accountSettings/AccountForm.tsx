import React, { FormEvent } from "react"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./AccountSettingForms.module.css"
import { getProfile, accountVerification } from "../../api"
import PillButton from "../shared/PillButton"
import PasswordConfirm from "./PasswordConfirm"
import Banner from "../shared/Banner"
import { getProfileImageSrc } from "../../utils/link-generator-utils"
import {
  signup_mobile_verification_started,
  profile_edit_started,
} from "../../analyticsEvents"
import { signup_continue } from "../../analyticsEvents"

interface PropsInterface {
  hasSession: boolean
  token: string
}

/**
 * A form to update Name, Email, and Phone.
 * Also you can trigger send verification for email and phone
 */
export default class AccountForm extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    fetching: true,
    originalName: "",
    name: "",
    originalEmail: "",
    email: "",
    emailIsVerified: false,
    emailVerificationState: "Not verified.",
    originalPhone: "",
    phone: "",
    hasPhone: false,
    phoneIsVerified: false,
    phoneVerificationState: "Not verified.",
    profileImgSrc: "",
    showPwConfirm: false,
    showEmailResendLink: true,
    showPhoneResendLink: true,
  }

  componentDidMount() {
    window.onpopstate = () => {
      window.location.reload()
    }
    window.analytics.track(profile_edit_started)
  }

  componentDidUpdate() {
    if (this.props.hasSession && this.props.token && this.state.fetching) {
      this.dispatchGetProfile()
    } else if (!this.props.hasSession || !this.props.token) {
      this.setState({
        statusMessage: "",
        fetching: false,
        originalName: "",
        name: "",
        originalEmail: "",
        email: "",
        emailIsVerified: false,
        originalPhone: "",
        phone: "",
        phoneIsVerified: false,
      })
    }
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  verifyInputs() {
    if (!this.state.name.trim().length) {
      this.setState({ statusMessage: "You must enter your full name." })
      return false
    }
    if (!(this.state.email.trim().length || this.state.phone.trim().length)) {
      this.setState({
        statusMessage: "At least an email or phone number required.",
      })
      return false
    }
    return true
  }

  resendEmailVerification() {
    this.dispatchAccountVerification("email")
  }
  resendPhoneVerification() {
    this.dispatchAccountVerification("phone")
  }
  async dispatchAccountVerification(type: string) {
    window.analytics.track(signup_mobile_verification_started, {
      verification_method: type,
    })
    if (type === "email") {
      try {
        await accountVerification({
          token: this.props.token,
          for: type,
        })
        this.setState({
          emailVerificationState: "Verification email sent.",
          showEmailResendLink: false,
        })
      } catch (message) {
        this.setState({
          emailVerificationState: "Error sending notification.",
          showEmailResendLink: true,
        })
      }
    }
    if (type === "phone") {
      try {
        await accountVerification({
          token: this.props.token,
          for: type,
        })
        this.setState({
          phoneVerificationState: "Verification text sent.",
          showPhoneResendLink: false,
        })
      } catch (message) {
        this.setState({
          phoneVerificationState: "Error sending notification.",
          showPhoneResendLink: true,
        })
      }
    }
  }
  async dispatchGetProfile() {
    try {
      const respJson = await getProfile({
        token: this.props.token,
      })
      const hasPhone = !!respJson.data.phone
      this.setState({
        fetching: false,
        originalName: respJson.data.name,
        name: respJson.data.name,
        originalEmail: respJson.data.email.address,
        email: respJson.data.email.address,
        emailIsVerified: respJson.data.email.isVerified,
        showEmailResendLink: !respJson.data.email.isVerified,
        hasPhone: hasPhone,
        originalPhone: hasPhone ? respJson.data.phone.number : "",
        phone: hasPhone ? respJson.data.phone.number : "",
        phoneIsVerified: hasPhone ? respJson.data.phone.isVerified : true,
        showPhoneResendLink: !(hasPhone
          ? respJson.data.phone.isVerified
          : true),
        profileImgSrc: getProfileImageSrc(respJson.data.profile.image),
      })
    } catch (message) {
      this.setState({
        statusMessage: message || "Internal error. Try logging in again.",
        fetching: false,
      })
    }
  }

  showPasswordConfirm(e: FormEvent) {
    window.analytics.track(signup_continue)
    window.analytics.track(profile_edit_started)

    e.preventDefault()
    if (this.verifyInputs()) {
      this.setState({ showPwConfirm: true })
      window.history.pushState({}, "")
    }
    return false
  }

  updateSuccessCallback() {
    this.setState({
      showPwConfirm: false,
      statusMessage: "",
    })
    this.dispatchGetProfile()
  }

  updateErrorCallback(message: string) {
    this.setState({
      showPwConfirm: false,
      statusMessage: message || "Internal error. Try logging in again.",
    })
  }

  renderAccountDetailForm() {
    return (
      <form
        className={styles.form}
        name='account'
        acceptCharset='utf-8'
        method='POST'
        action=''
        autoComplete='off'
        onSubmit={this.showPasswordConfirm.bind(this)}
      >
        <fieldset>
          {this.state.statusMessage.length ? (
            <Banner type='error'>{this.state.statusMessage}</Banner>
          ) : (
            ""
          )}
          <label
            htmlFor='name'
            className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
          >
            Full name
          </label>
          <input
            id='name'
            className={inputStyles.input}
            name='name'
            value={this.state.name}
            onChange={this.handleInput.bind(this)}
            type='text'
            placeholder='Ex. John Doe'
            required
          />

          <label
            htmlFor='email'
            className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
          >
            Email
          </label>
          <input
            id='email'
            className={`${inputStyles.input} ${
              !this.state.emailIsVerified ? styles.inputWithDetail : ""
            }`}
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleInput.bind(this)}
            placeholder='tony@starkindustries.com'
            required
          />
          {!this.state.emailIsVerified ? (
            <p id='email-verified' className={styles.inputDetail}>
              {this.state.emailVerificationState}{" "}
              {this.state.showEmailResendLink ? (
                <a onClick={this.resendEmailVerification.bind(this)}>
                  Resend verification email
                </a>
              ) : null}
            </p>
          ) : null}
          <label htmlFor='phone' className={inputStyles.inputLabel}>
            Phone
          </label>
          <input
            id='phone'
            className={`${inputStyles.input} ${
              this.state.hasPhone && !this.state.phoneIsVerified
                ? styles.inputWithDetail
                : ""
            }`}
            name='phone'
            type='text'
            value={this.state.phone}
            onChange={this.handleInput.bind(this)}
            placeholder='ex. +19001001000'
          />
          {this.state.hasPhone && !this.state.phoneIsVerified ? (
            <p id='phone-verified' className={styles.inputDetail}>
              {this.state.phoneVerificationState}{" "}
              {this.state.showPhoneResendLink ? (
                <a onClick={this.resendPhoneVerification.bind(this)}>
                  Resend verification text
                </a>
              ) : null}
            </p>
          ) : null}
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Update'
              clickHandler={() => {}}
            ></PillButton>
          </div>
        </fieldset>
      </form>
    )
  }

  renderPasswordConfirm() {
    return (
      <PasswordConfirm
        imageSrc={this.state.profileImgSrc}
        name={this.state.name}
        email={
          this.state.email === this.state.originalEmail ? "" : this.state.email
        }
        phone={
          this.state.phone === this.state.originalPhone ? "" : this.state.phone
        }
        token={this.props.token}
        updateSuccessCallback={this.updateSuccessCallback.bind(this)}
        updateErrorCallback={this.updateErrorCallback.bind(this)}
      ></PasswordConfirm>
    )
  }

  render() {
    if (this.state.showPwConfirm) {
      return this.renderPasswordConfirm()
    } else {
      return this.renderAccountDetailForm()
    }
  }
}
