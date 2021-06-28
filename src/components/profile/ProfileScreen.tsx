import React from "react"
import { Helmet } from "react-helmet"
import styles from "./ProfileScreen.module.css"
import inputStyles from "../../styles/modules/input.module.css"
import { getProfile, updateAccount } from "../../api"
import {
  checkAuthenticated,
  setPostAuthRedirURL,
} from "../../utils/state-management-utils"
import appPreview1 from "../../assets/images/app_preview_1.png"
import AppDownload from "../appDownload/AppDownload"
import { getProfileImageSrc } from "../../utils/link-generator-utils"
import { GoPencil, GoX, GoCheck } from "react-icons/go"
import { BsLink45Deg } from "react-icons/bs"
import { signup_continue, profile_edit_started } from "../../analyticsEvents"

export default class ProfileScreen extends React.Component {
  state = {
    hasSession: false,
    token: "",
    fetching: true,
    image: "",
    name: "",
    headline: "",
    occupation: "",
    views: 0,
    pointsEarned: 0,
    elevatorPitch: "",
    about: "",
    currentInviteCode: "",
    newInviteCode: "",
    editInviteCode: false,
    inviteCodeError: "",
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
    // window.analytics.track(signup_continue)
    window.analytics.track(profile_edit_started)
  }

  handleInput(e: { target: HTMLInputElement }) {
    this.setState({
      [e.target.name]: e.target.value,
      inviteCodeError: "",
    })
  }

  async dispatchGetProfile() {
    try {
      const respJson = await getProfile({
        token: this.state.token,
      })
      this.setState({
        fetching: false,
        image: getProfileImageSrc(respJson.data.profile.image),
        name: respJson.data.name,
        headline: respJson.data.headline,
        occupation: respJson.data.profile.occupation || "",
        views: respJson.data.profile.views || 0,
        pointsEarned: respJson.data.profile.pointsEarned || 0,
        elevatorPitch: respJson.data.profile.elevatorPitch || "",
        about: respJson.data.profile.about || "",
        newInviteCode: respJson.data.inviteCode,
        currentInviteCode: respJson.data.inviteCode,
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
    window.location.href = "/login"
  }

  editInviteCode() {
    this.setState({
      editInviteCode: true,
    })
  }

  cancelEdit() {
    this.setState({
      editInviteCode: false,
      newInviteCode: this.state.currentInviteCode,
      inviteCodeError: "",
    })
  }

  saveEdit() {
    if (this.state.newInviteCode.length < 1) {
      this.setState({
        inviteCodeError: "Please enter a custom invite code",
      })
    } else {
      this.dispatchUpdateInviteCode()
    }
  }

  async dispatchUpdateInviteCode() {
    try {
      await updateAccount(
        {
          inviteCode: this.state.newInviteCode,
        },
        this.state.token,
        ""
      )
      this.setState({
        editInviteCode: false,
        currentInviteCode: this.state.newInviteCode,
        inviteCodeError: "",
      })
    } catch (message) {
      this.setState({
        inviteCodeError: "URL is already taken",
      })
    }
  }

  render() {
    return (
      <main className={styles.profileScreen}>
        <Helmet>
          <title>Profile | GoalMogul Web</title>
        </Helmet>
        <div className={styles.appDownloadRow}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <h1>Download Today!</h1>
              <p>
                Begin your journey today by download our mobile app.
                <br />
                Connect with community and achive greatness together.
              </p>
              <AppDownload></AppDownload>
              <img src={appPreview1}></img>
            </div>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.left}>
              <img src={this.state.image} alt='profile' />
              <h1 className={styles.name}>{this.state.name}</h1>
              <p className={styles.headline}>{this.state.headline}</p>
              <hr />
              <div className={styles.customizeLink}>
                <h1>
                  <BsLink45Deg />
                  Edit your custom url
                </h1>
                <p>Personalize the URL for your profile.</p>
                {this.state.editInviteCode ? (
                  <div className={styles.invteCodeInputWrapper}>
                    <input
                      className={`
                          ${inputStyles.input}
                          ${styles.editInviteCodeInput}
                          ${
                            this.state.inviteCodeError === ""
                              ? ""
                              : styles.inputErrorState
                          }
                        `}
                      name='newInviteCode'
                      value={this.state.newInviteCode}
                      onChange={this.handleInput.bind(this)}
                      type='text'
                      required
                    />
                    {this.state.inviteCodeError === "" ? (
                      ""
                    ) : (
                      <span className={styles.inputErrorMsg}>
                        {this.state.inviteCodeError}
                      </span>
                    )}
                    <button
                      className={styles.cancel}
                      onClick={this.cancelEdit.bind(this)}
                    >
                      <GoX />
                    </button>
                    <button
                      className={styles.save}
                      onClick={this.saveEdit.bind(this)}
                    >
                      <GoCheck />
                    </button>
                  </div>
                ) : (
                  <p className={styles.inviteCodeDisplay}>
                    <a href={`/invite/${this.state.newInviteCode}`}>
                      https://{window.location.host}/invite/
                      {this.state.newInviteCode}
                    </a>
                    <button onClick={this.editInviteCode.bind(this)}>
                      <GoPencil />
                    </button>
                  </p>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <h1>Other Information</h1>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg
                    width='28'
                    height='26'
                    viewBox='0 0 28 26'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.3327 0.666504H16.666C17.3733 0.666504 18.0515 0.947455 18.5516 1.44755C19.0517 1.94765 19.3327 2.62593 19.3327 3.33317V5.99984H24.666C25.3733 5.99984 26.0515 6.28079 26.5516 6.78089C27.0517 7.28098 27.3327 7.95926 27.3327 8.6665V23.3332C27.3327 24.0404 27.0517 24.7187 26.5516 25.2188C26.0515 25.7189 25.3733 25.9998 24.666 25.9998H3.33268C1.85268 25.9998 0.666016 24.7998 0.666016 23.3332V8.6665C0.666016 7.1865 1.85268 5.99984 3.33268 5.99984H8.66602V3.33317C8.66602 1.85317 9.85268 0.666504 11.3327 0.666504ZM16.666 5.99984V3.33317H11.3327V5.99984H16.666Z'
                      fill='#828282'
                    />
                  </svg>
                </div>
                <div className={styles.textWrapper}>
                  <h2>Occupation</h2>
                  <p>{this.state.occupation}</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg
                    width='31'
                    height='24'
                    viewBox='0 0 31 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M30.334 16.6667L23.6673 23.3333L19.0007 18.6667L21.0007 16.6667L23.6673 19.3333L28.334 14.6667L30.334 16.6667ZM15.0007 6C16.0615 6 17.0789 6.42143 17.8291 7.17157C18.5792 7.92172 19.0007 8.93913 19.0007 10C19.0007 11.0609 18.5792 12.0783 17.8291 12.8284C17.0789 13.5786 16.0615 14 15.0007 14C13.9398 14 12.9224 13.5786 12.1722 12.8284C11.4221 12.0783 11.0007 11.0609 11.0007 10C11.0007 8.93913 11.4221 7.92172 12.1722 7.17157C12.9224 6.42143 13.9398 6 15.0007 6ZM15.0007 16.6667C15.6673 16.6667 16.294 16.5733 16.894 16.3867C16.534 17.3333 16.334 18.2933 16.334 19.3333V19.9333L15.0007 20C8.33398 20 2.64065 15.8533 0.333984 10C2.64065 4.14667 8.33398 0 15.0007 0C21.6673 0 27.3607 4.14667 29.6673 10C29.334 10.8533 28.9207 11.68 28.4407 12.4667C27.2407 11.7467 25.8273 11.3333 24.334 11.3333C23.294 11.3333 22.334 11.5333 21.3873 11.8933C21.574 11.2933 21.6673 10.6667 21.6673 10C21.6673 8.23189 20.9649 6.5362 19.7147 5.28595C18.4645 4.03571 16.7688 3.33333 15.0007 3.33333C13.2325 3.33333 11.5368 4.03571 10.2866 5.28595C9.03636 6.5362 8.33398 8.23189 8.33398 10C8.33398 11.7681 9.03636 13.4638 10.2866 14.714C11.5368 15.9643 13.2325 16.6667 15.0007 16.6667Z'
                      fill='#828282'
                    />
                  </svg>
                </div>
                <div className={styles.textWrapper}>
                  <h2>Views</h2>
                  <p>
                    {this.state.views} Profile View
                    {this.state.views > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21.9993 0.666504C20.7993 0.666504 19.3327 1.99984 19.3327 3.33317H8.66602C8.66602 1.99984 7.19935 0.666504 5.99935 0.666504H0.666016V12.6665C0.666016 13.9998 1.99935 15.3332 3.33268 15.3332H6.26602C6.79935 17.9998 8.53268 20.2665 12.666 20.6665V23.4398C8.66602 24.0532 8.66602 27.3332 8.66602 27.3332H19.3327C19.3327 27.3332 19.3327 24.0532 15.3327 23.4398V20.6665C19.466 20.2665 21.1993 17.9998 21.7327 15.3332H24.666C25.9993 15.3332 27.3327 13.9998 27.3327 12.6665V0.666504H21.9993ZM5.99935 12.6665H3.33268V3.33317H5.99935V12.6665ZM24.666 12.6665H21.9993V3.33317H24.666V12.6665Z'
                      fill='#828282'
                    />
                  </svg>
                </div>
                <div className={styles.textWrapper}>
                  <h2>Points</h2>
                  <p>
                    {this.state.pointsEarned} Point
                    {this.state.pointsEarned > 1 ? "s" : ""} Earned
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
