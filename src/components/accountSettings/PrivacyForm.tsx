import React, { FormEvent } from "react"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./AccountSettingForms.module.css"
import { getProfile, updateAccount } from "../../api"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"
import { profile_updated } from "../../analyticsEvents"

interface PropsInterface {
  hasSession: boolean
  token: string
}
/**
 * Form to set friend privacy
 */
export default class AccountForm extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    fetching: true,
    friendPrivacy: "",
  }

  componentDidUpdate() {
    if (this.props.hasSession && this.props.token && this.state.fetching) {
      this.dispatchGetProfile()
    } else if (!this.props.hasSession || !this.props.token) {
      this.setState({
        statusMessage: "",
        fetching: false,
        friendPrivacy: "",
      })
    }
  }

  handleInput(e: { target: HTMLSelectElement }) {
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
    const OPTIONS = ["Public", "Mutual", "Friends", "Private"]
    if (!OPTIONS.includes(this.state.friendPrivacy)) {
      this.setState({
        statusMessage: "Please select from the list of options.",
      })
      return false
    }
    return true
  }

  async dispatchGetProfile() {
    try {
      const respJson = await getProfile({
        token: this.props.token,
      })
      this.setState({
        fetching: false,
        friendPrivacy: respJson.data.privacy.friends,
      })
    } catch (message) {
      this.setState({
        statusMessage: message || "Internal error. Try logging in again.",
        fetching: false,
      })
    }
  }
  async dispatchUpdateAccount() {
    try {
      await updateAccount(
        {
          friends: this.state.friendPrivacy,
        },
        this.props.token,
        "/privacy"
      )
      window.analytics.track(profile_updated, {
        update: "saved",
      })
    } catch (message) {
      this.setState({ statusMessage: message })
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
          <label htmlFor='friendPrivacy' className={inputStyles.inputLabel}>
            Who can see my friends?
          </label>
          <select
            id='friendPrivacy'
            className={inputStyles.select}
            name='friendPrivacy'
            value={this.state.friendPrivacy}
            onChange={this.handleInput.bind(this)}
          >
            <option value='Public'>Public</option>
            <option value='Mutual'>Mutual</option>
            <option value='Friends'>Friends</option>
            <option value='Private'>Private</option>
          </select>
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
}
