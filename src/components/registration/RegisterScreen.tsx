import React, { FormEvent } from "react"
import { Helmet } from "react-helmet"
import lionPng from "../../assets/images/LionIllustration.png"
import "../../styles/colors.css"
import "../../styles/sizes.css"
import inputStyles from "../../styles/modules/input.module.css"
import styles from "./RegisterScreen.module.css"
import { register } from "../../api"
import {
  createAuthenticatedSession,
  getInviteCode,
  postAuthRedirOrFailover,
} from "../../utils/state-management-utils"
import PillButton from "../shared/PillButton"
import Banner from "../shared/Banner"
import PillButtonGroup from "../shared/PillButtonGroup"
import { RouteComponentProps } from "react-router-dom"
import { RegisterByWeb, SignupByWeb } from "../../analyticsEvents"
import {
  RegisterByWeb,
  SignupByWeb,
  signup_started,
  signup_completed,
} from "../../analyticsEvents"

/**
 * Page for registering an account.
 * Form inputs include Name, Email, Phone(optional), and Password
 * Look for any inviteCode in localStorage
 */
interface PropsInterface extends RouteComponentProps {}
export default class RegisterScreen extends React.Component<PropsInterface> {
  state = {
    statusMessage: "",
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    password: "",
    urlParams: {
      firstname: "",
    },
  }

  componentDidMount() {
    if (this.props.location.search) {
      const pairs = this.props.location.search.split("?")[1].split("&")
      const params: Partial<{ [propName: string]: string }> = {}
      pairs.forEach((pair) => {
        const key = pair.split("=")[0]
        const value = pair.split("=")[1]
        params[key] = value
      })
      this.setState({ urlParams: params })
    }
  }

  handleInput(e: { target: HTMLInputElement | HTMLSelectElement }) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleGenderSelect(gender: string) {
    this.setState({
      gender: gender,
    })
  }

  handleSumbit(e: FormEvent) {
    e.preventDefault()
    this.setState({ statusMessage: "" })
    if (this.verifyInputs()) {
      this.dispatchRegister()
    }
    // clear password input
    this.setState({ password: "" })
    return false
  }

  verifyInputs() {
    return this.verifyAge() && this.verifyPassword()
  }

  verifyAge() {
    const dob = new Date(
      `${this.state.month} ${this.state.day}, ${this.state.year}`
    )
    if (this.calculateAge(dob) >= 13) {
      return true
    } else {
      this.setState({
        statusMessage: "You must be over 13 to signup",
      })
      return false
    }
  }

  verifyPassword() {
    if (this.state.password.length < 8) {
      this.setState({
        statusMessage: "Password must be at least 8 characters.",
      })
      return false
    }
    return true
  }

  calculateAge(birthDate: Date) {
    const now = new Date()
    var age = now.getFullYear() - birthDate.getFullYear()
    if (
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  async dispatchRegister() {
    try {
      const respJson = await register({
        name: this.state.name.trim(),
        email: this.state.email.trim().toLowerCase(),
        dateOfBirth: new Date(
          `${this.state.month} ${this.state.day}, ${this.state.year}`
        ),
        gender: this.state.gender,
        password: this.state.password,
        inviteCode: getInviteCode() || "",
      })
      createAuthenticatedSession({
        startTime: new Date().toString(),
        token: respJson.token,
      })

      if (getInviteCode()) {
        window.analytics.track(RegisterByWeb, {
          userId: respJson.userId,
          inviteCode: getInviteCode(),
        })
      } else {
        window.analytics.track(SignupByWeb, {
          userId: respJson.userId,
        })
      }

      if (this.props.location.hash.includes("#goal")) {
        window.analytics.track(signup_completed)
        const publicIdentifier = this.props.location.hash.replace("#goal", "")
        postAuthRedirOrFailover(`/goal/${publicIdentifier}`)
      } else {
        postAuthRedirOrFailover("/profile")
        window.analytics.track(signup_completed)

      }
    } catch (message) {
      this.setState({ statusMessage: message })
    }
  }

  /**
   * Return true if the year is a leap year
   * @param year
   */
  leapYear(year: number) {
    if (isNaN(year)) return
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  generateDayOptions() {
    let days = 31
    if (
      ["April", "June", "Septempber", "November"].includes(this.state.month)
    ) {
      days = 30
    } else if (this.state.month === "February") {
      if (this.leapYear(parseInt(this.state.year))) {
        days = 29
      } else {
        days = 28
      }
    }
    let res = []
    for (let i = 1; i <= days; i++) {
      res.push(<option value={i.toString()}>{i}</option>)
    }
    return res
  }

  generateYearOptions() {
    let startYear = 1800
    let endYear = new Date().getFullYear() - 13
    let res = []
    for (let i = endYear; i >= startYear; i--) {
      res.push(<option value={i.toString()}>{i}</option>)
    }
    return res
  }

  render() {
    return (
      <main className={styles.registerScreen}>
        <Helmet>
          <title>Sign up | GoalMogul Web</title>
        </Helmet>
        <div className={styles.row}>
          <div className={styles.signupCard}>
            <h1>
              Sign Up{" "}
              {this.state.urlParams.firstname !== "" ? "to continue" : ""}
            </h1>
            {this.state.urlParams.firstname !== "" ? (
              <p>
                Follow {this.state.urlParams.firstname}'s progress on goals and
                share your own...
              </p>
            ) : null}
            <form
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
                  htmlFor='name'
                  className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                >
                  Full Name
                </label>
                <input
                  id='name'
                  className={inputStyles.input}
                  name='name'
                  value={this.state.name}
                  onChange={this.handleInput.bind(this)}
                  type='text'
                  placeholder='Full Name'
                  required
                  autoFocus
                />
                <label
                  htmlFor='email'
                  className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                >
                  Email
                </label>
                <input
                  id='email'
                  className={inputStyles.input}
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInput.bind(this)}
                  type='email'
                  placeholder='Your email address'
                  required
                />
                <label
                  htmlFor='DoB'
                  className={`${inputStyles.requiredInput} ${inputStyles.inputLabel}`}
                >
                  Date of Birth <span>(You must be over 13)</span>
                </label>
                <div className={styles.dobSelectWrapper}>
                  <select
                    required
                    className={inputStyles.select}
                    name='year'
                    value={this.state.year}
                    onChange={this.handleInput.bind(this)}
                  >
                    <option value='' disabled>
                      Year
                    </option>
                    {this.generateYearOptions()}
                  </select>
                  <select
                    required
                    className={inputStyles.select}
                    name='month'
                    value={this.state.month}
                    onChange={this.handleInput.bind(this)}
                  >
                    <option value='' disabled>
                      Month
                    </option>
                    <option value='Janaury'>Janaury</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='June'>June</option>
                    <option value='July'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='December'>December</option>
                  </select>
                  <select
                    required
                    className={inputStyles.select}
                    name='day'
                    value={this.state.day}
                    onChange={this.handleInput.bind(this)}
                  >
                    <option value='' disabled>
                      Day
                    </option>
                    {this.generateDayOptions()}
                  </select>
                </div>

                <label htmlFor='gender' className={inputStyles.inputLabel}>
                  Gender
                </label>
                <PillButtonGroup
                  className={styles.genderButtonGroup}
                  selectedValue={this.state.gender}
                  onChange={this.handleGenderSelect.bind(this)}
                  options={[
                    {
                      buttonText: "Female",
                      value: "Female",
                    },
                    {
                      buttonText: "Male",
                      value: "Male",
                    },
                    {
                      buttonText: "Other",
                      value: "Other",
                    },
                    {
                      buttonText: "Prefer not to say",
                      value: "",
                    },
                  ]}
                  style='default'
                  type='outline'
                ></PillButtonGroup>
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
                  placeholder='At least 8 characters'
                  required
                  minLength={8}
                />
                <PillButton
                  style='primary'
                  type='solid'
                  buttonText='Join GoalMogul'
                  clickHandler={() => {
                    window.analytics.track(signup_started)
                  }}                ></PillButton>
              </fieldset>
            </form>
          </div>
          <div className={styles.iconWrapper}>
            <img src={lionPng} />
          </div>
        </div>
      </main>
    )
  }
}
