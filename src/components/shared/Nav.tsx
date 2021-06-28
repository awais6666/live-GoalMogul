import React from "react"
import styles from "./Nav.module.css"
import {
  checkAuthenticated,
  removeAuthenticatedSession,
} from "../../utils/state-management-utils"
import PillButton from "./PillButton"
import { BiMenu } from "react-icons/bi"

/**
 * Navigation component shared by all pages.
 * If user is not logged in, show Contact Us, Login, and Signup buttons
 * If user is logged in, show Account, Profile, and Logout buttons
 */
export default class Nav extends React.Component {
  state = {
    hasSession: false,
    navMenuOpen: false,
  }
  componentDidMount() {
    this.setState({ hasSession: checkAuthenticated()[0] })
  }
  logout() {
    removeAuthenticatedSession()
    window.location.href = "/"
  }
  openNavMenu() {
    this.setState({
      navMenuOpen: true,
    })
  }
  closeNavMenu() {
    this.setState({
      navMenuOpen: false,
    })
  }

  navMenu() {
    return this.state.navMenuOpen ? (
      <div className={styles.menuWrapper}>
        <div
          className={styles.overlay}
          onClick={this.closeNavMenu.bind(this)}
        ></div>
        <div className={styles.menuContent}>
          {this.state.hasSession ? (
            <ul>
              <li>
                <a href='/settings'>Account</a>
              </li>
              <li>
                <a href='/profile'>Profile</a>
              </li>
              <li>
                <a href='#' onClick={this.logout}>
                  Log Out
                </a>
              </li>
            </ul>
          ) :  null
          // (
          //   <ul>
          //     {/* <li>
          //       <a href='mailto:support@goalmogul.com'>Contact Support</a>
          //     </li> */}
          //     <li>
          //       <a href='/login'>Log In</a>
          //     </li>
          //     <li>
          //       <a href='/register'>Sign Up</a>
          //     </li>
          //   </ul>
          // )
          }
          {this.footerItems()}
        </div>
      </div>
    ) : (
      ""
    )
  }

  footerItems() {
    return (
      <ul>
        {/* <li>
          <a href='/'>GoalMogul Home</a>
        </li> */}
        <li>
          <a href='mailto:support@goalmogul.com'>Contact Support</a>
        </li>
        <li>
          <a href='/terms'>Terms of Service</a>
        </li>
        <li>
          <a href='/privacy'>Privacy Policy</a>
        </li>
      </ul>
    )
  }

  render() {
    if (this.state.hasSession) {
      return (
        <nav>
          <ul>
            <li className={styles.logoContainer}>
              <a href='/'>
                <div className={styles.logo}></div>
              </a>
            </li>
            <li className={styles.navItem}>
              <a href='/settings'>Account</a>
            </li>
            <li className={styles.navItem}>
              <a href='/profile'>Profile</a>
            </li>
            <li className={styles.navItem}>
              <a href='#' onClick={this.logout}>
                <PillButton
                  type='solid'
                  style='default'
                  buttonText='Log out'
                  clickHandler={() => {}}
                  className={styles.singupBtn}
                ></PillButton>
              </a>
            </li>
            <li className={styles.menu} onClick={this.openNavMenu.bind(this)}>
              <BiMenu />
            </li>
          </ul>
          {this.navMenu()}
        </nav>
      )
    } else {
      return (
        <nav>
          <ul>
            <li className={styles.logoContainer}>
              <a href='/splashScreenv6'>
                <div className={styles.logo}></div>
              </a>
            </li>
            {/* <li className={styles.navItem}>
              <a href='mailto:support@goalmogul.com'>Contact Support</a>
            </li> */}
            {/* <li className={styles.navItem}>
              <a href='/login'>Log In</a>
            </li>
            <li className={styles.navItem}>
              <a href='/register'>
                <PillButton
                  type='solid'
                  style='default'
                  buttonText='Sign Up'
                  clickHandler={() => {}}
                  className={styles.singupBtn}
                ></PillButton>
              </a>
            </li> */}
            <li className={styles.menu} onClick={this.openNavMenu.bind(this)}>
              <BiMenu />
            </li>
          </ul>
          {this.navMenu()}
        </nav>
      )
    }
  }
}
