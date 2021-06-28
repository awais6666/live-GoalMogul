import React, { FormEvent } from "react"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./AccountSettingForms.module.css"
import { updateAccount } from "../../api"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"
import { profile_updated } from "../../analyticsEvents"


interface PropsInterface {
  hasSession: boolean
  token: string
}
/**
 * Take old password and new password for updating password
 */
export default class PasswordUpdateForm extends React.Component<
  PropsInterface
> {
  state = {
    statusMessage: "",
    oldPassword: "",
    newPassword: "",
    newPasswordRe: "",
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
    this.setState({
      oldPassword: "",
      newPassword: "",
      newPasswordRe: "",
    })
    return false
  }

  verifyInputs() {
    if (this.state.newPassword.length < 8) {
      this.setState({
        statusMessage: "Ensure your password is at least 8 characters.",
      })
      return false
    }
    if (this.state.newPassword !== this.state.newPasswordRe) {
      this.setState({ statusMessage: "Passwords do not match." })
      return false
    }
    return true
  }

  async dispatchUpdateAccount() {
    try {
      await updateAccount(
        {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        },
        this.props.token,
        "/password"
      )
      window.analytics.track(profile_updated, {
        update: "saved",
      })
    } catch (message) {
      this.setState({
        statusMessage: message || "Internal error. Try logging in again.",
      })
      window.analytics.track(profile_updated, {
        update: "canceled",
      })
    }
  }

  render() {
    return (
      <form
        name='account'
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
            htmlFor='oldPassword'
            className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
          >
            Old Password
          </label>
          <input
            id='oldPassword'
            className={inputStyles.input}
            name='oldPassword'
            value={this.state.oldPassword}
            onChange={this.handleInput.bind(this)}
            type='password'
            placeholder='Your current password'
            required
          />
          <label
            htmlFor='newPassword'
            className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
          >
            New Password
          </label>
          <input
            id='newPassword'
            className={inputStyles.input}
            name='newPassword'
            value={this.state.newPassword}
            onChange={this.handleInput.bind(this)}
            type='password'
            placeholder="Ensure it's at least 8 characters"
            required
          />
          <label
            htmlFor='newPasswordRe'
            className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
          >
            Re-enter Password
          </label>
          <input
            id='newPasswordRe'
            className={inputStyles.input}
            name='newPasswordRe'
            value={this.state.newPasswordRe}
            onChange={this.handleInput.bind(this)}
            type='password'
            placeholder='Re enter your new password'
            required
          />
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Change'
              clickHandler={() => {}}
            ></PillButton>
          </div>
        </fieldset>
      </form>
    )
  }
}
