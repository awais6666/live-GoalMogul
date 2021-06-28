import React, { FormEvent } from "react"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./PasswordConfirm.module.css"
import { updateAccount } from "../../api"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"
import { profile_updated } from "../../analyticsEvents"

interface PropsInterface {
  imageSrc: string
  name: string
  email: string
  phone: string
  token: string
  updateSuccessCallback: Function
  updateErrorCallback: Function
}
/**
 * Asks the user to provide the password when updating account info (email/phone/name)
 * Submit the update request with params (in props) and current password
 */
export default class PasswordConfirm extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    password: "",
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSumbit(e: FormEvent) {
    e.preventDefault()
    this.setState({ statusMessage: "" })
    if (this.verifyInputs()) {
      this.dispatchUpdateAccount()
    }
    return false
  }

  verifyInputs() {
    if (this.state.password.length < 8) {
      this.setState({
        statusMessage: "Ensure your password is at least 8 characters.",
      })
      return false
    }
    return true
  }

  async dispatchUpdateAccount() {
    try {
      await updateAccount(
        {
          name: this.props.name,
          headline: "",
          email: this.props.email,
          phone: this.props.phone,
          currentPassword: this.state.password,
        },
        this.props.token,
        ""
      )
      window.analytics.track(profile_updated, {
        update: "saved",
      })
      this.props.updateSuccessCallback()
    } catch (message) {
      this.setState({
        statusMessage: message || "Internal error. Try logging in again.",
      })
      this.props.updateErrorCallback(message)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <img src={this.props.imageSrc} />
          <h1>Hi {this.props.name.split(" ")[0]},</h1>
          <h2>Let's do a quick verification!</h2>
          <form
            className={styles.form}
            name='passwordConfirm'
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
                Password
              </label>
              <input
                id='password'
                className={inputStyles.input}
                name='password'
                value={this.state.password}
                onChange={this.handleInput.bind(this)}
                type='password'
                placeholder='Enter your password'
                required
              />
              <div className={styles.buttonWrapper}>
                <PillButton
                  style='primary'
                  type='solid'
                  buttonText='Update'
                  clickHandler={() => {}}
                ></PillButton>
              </div>
              <div className={styles.buttonWrapper}>
                <PillButton
                  style='primary'
                  type='text'
                  buttonText='Forgot password?'
                  clickHandler={() => {
                    window.location.href = "/password-reset"
                  }}
                ></PillButton>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
