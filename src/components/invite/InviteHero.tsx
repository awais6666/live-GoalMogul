import React from "react"
import "../../styles/colors.css"
import "../../styles/sizes.css"
import styles from "./InviteHero.module.css"
import { getInvitor } from "../../api"
import { storeInviteCode } from "../../utils/state-management-utils"
import { getProfileImageSrc } from "../../utils/link-generator-utils"
import PillButton from "../shared/PillButton"

interface PropsInterface {
  code: string
}

/**
 * This is the page you goto when you get an invite link from an existing user
 */
export default class InviteHero extends React.Component<PropsInterface> {
  state = {
    success: false,
    inviter: {
      firstName: "",
      image: "",
      goalCount: 0,
    },
    statusMessage: "",
  }

  componentDidMount() {
    this.dispatchGetInvitor(this.props.code)
  }

  async dispatchGetInvitor(code: string) {
    try {
      const respJson = await getInvitor({
        inviteCode: code,
      })
      this.setState({
        success: true,
        inviter: {
          firstName: respJson.data.name.split(" ")[0],
          image: getProfileImageSrc(respJson.data.profile.image),
          goalCount: respJson.data.goalCount || 0,
        },
      })
      storeInviteCode(code)
    } catch (message) {
      this.setState({ statusMessage: message, success: false })
    }
  }

  gotoRegister() {
    window.location.href = "/register"
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>
            Your friend {this.state.inviter.firstName} has
            <br />
            shared {this.state.inviter.goalCount}{" "}
            {this.state.inviter.goalCount > 1 ? "goals" : "goal"} with you
          </h1>
          <img src={this.state.inviter.image} alt='profile' />
          <h2>
            To check their goals and offer feedback,
            <br />
            <b>Sign up for GoalMogul!</b>
          </h2>
          <div className={styles.buttonWrapper}>
            <PillButton
              style='primary'
              type='solid'
              buttonText='Join GoalMogul'
              clickHandler={this.gotoRegister}
            ></PillButton>
          </div>
        </div>
      </div>
    )
  }
}
