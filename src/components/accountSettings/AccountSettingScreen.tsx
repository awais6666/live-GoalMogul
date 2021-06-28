import React from "react"
import { Helmet } from "react-helmet"
import styles from "./AccountSettingScreen.module.css"
import {
  checkAuthenticated,
  setPostAuthRedirURL,
} from "../../utils/state-management-utils"
import AccountForm from "./AccountForm"
import PrivacyForm from "./PrivacyForm"
import PasswordUpdateForm from "./PasswordUpdateForm"
import Collapse from "../shared/Collapse"

/**
 * Show 3 forms for updating account info: Account detail, privacy, and password
 */
export default class AccountSettingScreen extends React.Component {
  state = {
    hasSession: false,
    token: "",
  }

  componentDidMount() {
    var authTest = checkAuthenticated() // returns tuple: [isAuthenticated, authToken]
    if (!authTest[0]) {
      setPostAuthRedirURL(window.location.pathname) // come back here after auth
      return this.redirectLogin()
    }
    this.setState({ hasSession: authTest[0], token: authTest[1] })
  }

  redirectLogin() {
    window.location.href = "/login"
  }

  render() {
    return (
      <main className={styles.accountScreen}>
        <Helmet>
          <title>Settings | GoalMogul Web</title>
        </Helmet>
        <Collapse header='Account details' defaultOpen={true}>
          <AccountForm
            hasSession={this.state.hasSession}
            token={this.state.token}
          />
        </Collapse>
        <Collapse header='Change your password' defaultOpen={false}>
          <PasswordUpdateForm
            hasSession={this.state.hasSession}
            token={this.state.token}
          />
        </Collapse>
        <Collapse header='Privacy' defaultOpen={false}>
          <PrivacyForm
            hasSession={this.state.hasSession}
            token={this.state.token}
          />
        </Collapse>
      </main>
    )
  }
}
