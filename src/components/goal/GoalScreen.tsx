import React from "react"
import { Helmet } from "react-helmet"
import styles from "./GoalScreen.module.css"
import { getProfile, getGoalUpdates, getComments, getGoalPub } from "../../api"
import {
  checkAuthenticated,
  setPostAuthRedirURL,
  storeInviteCode,
} from "../../utils/state-management-utils"
import {
  getProfileImageSrc,
  imageS3Src,
} from "../../utils/link-generator-utils"
import PillButton from "../shared/PillButton"
import AppDownload from "../appDownload/AppDownload"
import { RouteComponentProps } from "react-router-dom"
import { FiEye } from "react-icons/fi"
import {
  FaEllipsisH,
  FaHeart,
  FaCommentAlt,
  FaRegCommentAlt,
  FaHandsHelping,
  FaPlus,
} from "react-icons/fa"
import {
  RiShareForwardFill,
  RiShareForwardLine,
  RiHeartLine,
} from "react-icons/ri"
import { IoIosArrowDroprightCircle, IoIosArrowDown } from "react-icons/io"
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai"
import { GiStairs } from "react-icons/gi"
import moment from "moment"

import badgeGreen from "../../assets/images/badge_green.png"
import badgeBronze from "../../assets/images/badge_bronze.png"
import badgeSilver from "../../assets/images/badge_silver.png"
import badgeGold from "../../assets/images/badge_gold.png"
import DownloadModal from "./DownloadModal"
import lionPng from "../../assets/images/LionIllustration.png"

interface PropsInterface
  extends RouteComponentProps<{ publicIdentifier: string }> {}
interface StateInterface {
  hasSession: Boolean
  token: string
  sessionUser: {
    id: string
    image: string
    name: string
    headline: string
  }
  goal: {
    _id: string
    owner: {
      id: string
      image: string
      name: string
      milestoneBadge: number
    }
    category: string
    priority: string
    viewCount: number
    created: string
    title: string
    steps: Array<{
      _id: string
      isCompleted: boolean
      description: string
      commentCnt: number
    }>
    needs: Array<{
      _id: string
      isCompleted: boolean
      description: string
      commentCnt: number
    }>
    start: string
    end: string
    likeCount: number
    commentCount: number
    shareCount: number
  }
  updates: Array<{
    mediaRef?: string
    content: {
      text: string
    }
  }>
  collapseOpen: {
    [propName: string]: boolean
  }
  downloadModalOpen: boolean
}

export default class GoalScreen extends React.Component<
  PropsInterface,
  StateInterface
> {
  UPDATE_LIMIT = 19
  boundDownloadModalToggle: (e: React.MouseEvent) => void

  constructor(props: PropsInterface) {
    super(props)
    this.state = {
      hasSession: false,
      token: "",
      sessionUser: {
        id: "",
        image: "",
        name: "",
        headline: "",
      },
      goal: {
        _id: "",
        owner: {
          id: "",
          image: "",
          name: "",
          milestoneBadge: 0,
        },
        category: "",
        priority: "",
        viewCount: 0,
        created: "",
        title: "",
        steps: [],
        needs: [],
        start: "",
        end: "",
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
      },
      updates: [],
      collapseOpen: {
        steps: true,
        needs: true,
      },
      downloadModalOpen: false,
    }
    this.boundDownloadModalToggle = this.toggleDownloadModal.bind(this)
  }

  componentDidMount() {
    var authTest = checkAuthenticated() // returns tuple: [isAuthenticated, authToken]
    this.setState({ hasSession: authTest[0], token: authTest[1] })
    const token = authTest[0] ? authTest[1] : null
    this.dispatchGetGoalPub(token)
    if (!authTest[0]) {
      setPostAuthRedirURL(window.location.pathname)
    }
  }

  async dispatchGetGoalPub(token: string) {
    try {
      const respJson = await getGoalPub({
        publicIdentifier: this.props.match.params.publicIdentifier,
      })
      this.setState({
        goal: {
          _id: respJson.data._id,
          owner: {
            id: respJson.data.owner._id,
            image: getProfileImageSrc(respJson.data.owner.profile.image),
            name: respJson.data.owner.name,
            milestoneBadge:
              respJson.data.owner.profile.badges.milestoneBadge
                .currentMilestone,
          },
          category: respJson.data.category,
          priority: this.stringifyPriority(respJson.data.priority),
          viewCount: respJson.data.viewCount,
          created: respJson.data.created,
          title: respJson.data.title,
          steps: respJson.data.steps,
          needs: respJson.data.needs,
          start: respJson.data.start,
          end: respJson.data.end,
          likeCount: respJson.data.likeCount,
          commentCount: respJson.data.commentCount,
          shareCount: respJson.data.shareCount,
        },
      })
      if (token) {
        this.dispatchGetProfile(token)
        this.dispatchGetGoalComments(respJson.data._id, token)
        this.dispatchGetGoalUpdates(respJson.data._id, token)
      }
      storeInviteCode(respJson.data.owner.inviteCode)
    } catch (message) {
      alert("Error loading goal detail.\n\n" + message)
    }
  }

  async dispatchGetGoalComments(goalId: string, token: string) {
    try {
      const respJson = await getComments({
        parentId: goalId,
        parentType: "Goal",
        token: token,
      })
      const steps = this.state.goal.steps.map((step) => {
        return {
          ...step,
          commentCnt: respJson.data.filter(
            (comment: { stepRef: string }) => comment.stepRef === step._id
          ).length,
        }
      })
      const needs = this.state.goal.needs.map((need) => {
        return {
          ...need,
          commentCnt: respJson.data.filter(
            (comment: { needRef: string }) => comment.needRef === need._id
          ).length,
        }
      })
      this.setState((prevState) => {
        return {
          ...prevState,
          goal: {
            ...prevState.goal,
            steps: steps,
            needs: needs,
          },
        }
      })
    } catch (message) {
      alert(
        "Error loading profile information. Try logging in again.\n\n" + message
      )
    }
  }

  async dispatchGetProfile(token: string) {
    try {
      const respJson = await getProfile({
        token: token,
      })
      this.setState({
        sessionUser: {
          id: respJson.data._id,
          image: getProfileImageSrc(respJson.data.profile.image),
          name: respJson.data.name,
          headline: respJson.data.headline,
        },
      })
    } catch (message) {
      alert(
        "Error loading profile information. Try logging in again.\n\n" + message
      )
    }
  }

  async dispatchGetGoalUpdates(goalId: string, token: string) {
    try {
      const respJson = await getGoalUpdates({
        goalId: goalId,
        token: token,
        limit: this.UPDATE_LIMIT.toString(),
      })
      this.setState({
        updates: respJson.data,
      })
    } catch (message) {
      alert("Error loading goal updates.\n\n" + message)
    }
  }

  stringifyPriority(priority: Number) {
    if (priority > 6) {
      return "Hight"
    } else if (priority > 3) {
      return "Medium"
    } else {
      return "Low"
    }
  }

  redirectLogin() {
    window.location.href = "/login"
  }

  redirectProfile() {
    window.location.href = "/profile"
  }

  redirectRegister() {
    window.location.href = `/register?firstname=${
      this.state.goal.owner.name.split(" ")[0]
    }#goal${this.props.match.params.publicIdentifier}`
  }

  redirectLanding() {
    window.location.href = "/"
  }

  getMilestoneBadge() {
    let badge
    switch (this.state.goal.owner.milestoneBadge) {
      case 0:
        badge = badgeGreen
        break
      case 1:
        badge = badgeBronze
        break
      case 2:
        badge = badgeSilver
        break
      case 3:
        badge = badgeGold
        break
    }
    return <img className={styles.badge} src={badge} />
  }

  getUpdates() {
    let updates = []
    if (this.state.sessionUser.id === this.state.goal.owner.id) {
      updates.push(
        <div
          key='update-new'
          className={`${styles.addUpdate} ${styles.clickable}`}
          onClick={this.boundDownloadModalToggle}
        >
          <FaPlus />
        </div>
      )
    }
    if (this.state.updates.length) {
      this.state.updates.forEach((update, index) => {
        if (update.mediaRef) {
          const mediaSrc = imageS3Src(update.mediaRef)
          updates.push(
            <div
              key={`update-${index}`}
              className={`${styles.update} ${styles.clickable}`}
              onClick={this.boundDownloadModalToggle}
            >
              <img src={mediaSrc} alt='update media' />
            </div>
          )
        } else {
          updates.push(
            <div
              key={`update-${index}`}
              className={`${styles.update} ${styles.clickable}`}
              onClick={this.boundDownloadModalToggle}
            >
              <span>{update.content.text}</span>
            </div>
          )
        }
      })
    } else {
      for (let i = 0; i < this.UPDATE_LIMIT; i++) {
        const opacity = (this.UPDATE_LIMIT - i + 3) / this.UPDATE_LIMIT
        updates.push(
          <div
            key={`emptyUpdate-${i}`}
            className={styles.emptyUpdate}
            style={{ opacity: opacity }}
          ></div>
        )
      }
    }
    return updates
  }

  toggleCollapse(id: string) {
    this.setState((prevState: StateInterface) => {
      return {
        collapseOpen: {
          ...prevState.collapseOpen,
          [id]: !prevState.collapseOpen[id],
        },
      }
    })
  }

  toggleDownloadModal(e: React.MouseEvent) {
    if (this.state.hasSession) {
      this.setState((prevState: StateInterface) => {
        return {
          downloadModalOpen: !prevState.downloadModalOpen,
        }
      })
    } else {
      this.redirectRegister()
    }
  }

  profileCard() {
    return (
      <div className={styles.profileCard}>
        <img src={this.state.sessionUser.image} alt='profile' />
        <h1 className={styles.name}>{this.state.sessionUser.name}</h1>
        <p className={styles.headline}>{this.state.sessionUser.headline}</p>
        <div className={styles.buttonWrapper}>
          <PillButton
            type='solid'
            style='primary'
            buttonText='View Profile'
            clickHandler={this.redirectProfile}
          ></PillButton>
        </div>
        <hr />
        <h1>Download GoalMogul Now!</h1>
        <AppDownload></AppDownload>
      </div>
    )
  }

  singupLearnMoreCard() {
    return (
      <>
        <div className={styles.signupCard}>
          <h1>New to GoalMogul?</h1>
          <p>We’re an incredibly encouraging, ... community.</p>
          <PillButton
            type='solid'
            style='primary'
            buttonText='Sign Up'
            clickHandler={this.redirectRegister.bind(this)}
          ></PillButton>
        </div>
        <div className={styles.learnMoreCard}>
          <h1>Learn More about us</h1>
          <div className={styles.learnMoreContent}>
            <img src={lionPng} />
            <p>
              We’re glad to have you here. Take a few minutes to learn about us.
              We promise it’ll be worth it.
            </p>
          </div>
          <PillButton
            type='solid'
            style='primary'
            buttonText='Learn More'
            clickHandler={this.redirectLanding}
          ></PillButton>
        </div>
      </>
    )
  }

  render() {
    return (
      <main className={styles.goalScreen}>
        <Helmet>
          <title>Goal | GoalMogul Web</title>
        </Helmet>
        <div className={styles.row}>
          <div className={styles.content}>
            <div className={styles.goal}>
              <div className={styles.goalCard}>
                <div className={styles.goalOwner}>
                  <img
                    className={`${styles.profilePic} ${styles.clickable}`}
                    src={this.state.goal.owner.image}
                    alt='profile'
                    onClick={this.boundDownloadModalToggle}
                  />
                  <div className={styles.text}>
                    <div className={styles.topRow}>
                      <div
                        className={`${styles.name} ${styles.clickable}`}
                        onClick={this.boundDownloadModalToggle}
                      >
                        {this.state.goal.owner.name}
                      </div>
                      <div className={styles.badges}>
                        {this.getMilestoneBadge()}
                      </div>
                      <div className={styles.category}>
                        {this.state.goal.category}
                      </div>
                    </div>
                    <div className={styles.bottomRow}>
                      <div>{moment(this.state.goal.created).fromNow()}</div>
                      <div className={styles.divider}></div>
                      <div>{this.state.goal.priority} priority</div>
                      <div className={styles.divider}></div>
                      <FiEye />
                      <div>{this.state.goal.viewCount}</div>
                    </div>
                  </div>
                  <div
                    className={`${styles.ellipsis} ${styles.clickable}`}
                    onClick={this.boundDownloadModalToggle}
                  >
                    <FaEllipsisH />
                  </div>
                </div>
                <div className={styles.goalTitle}>{this.state.goal.title}</div>
                <div className={styles.updates}>{this.getUpdates()}</div>
                <div className={styles.progress}>
                  <div className={styles.dates}>
                    <span>
                      {moment(this.state.goal.start).format("MMM YYYY")}
                    </span>
                    <span>
                      {moment(this.state.goal.end).format("MMM YYYY")}
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    {this.state.goal.steps.map((step, index) => {
                      return (
                        <div
                          key={`step-${index}`}
                          className={
                            step.isCompleted
                              ? styles.completedStep
                              : styles.incompleteStep
                          }
                        ></div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.info}>
                  <span
                    className={`${styles.like} ${styles.clickable}`}
                    onClick={this.boundDownloadModalToggle}
                  >
                    <FaHeart />
                    {this.state.goal.likeCount}
                  </span>
                  <span
                    className={`${styles.comment} ${styles.clickable}`}
                    onClick={this.boundDownloadModalToggle}
                  >
                    <FaCommentAlt />
                    {this.state.goal.commentCount}
                  </span>
                  <span
                    className={`${styles.share} ${styles.clickable}`}
                    onClick={this.boundDownloadModalToggle}
                  >
                    <RiShareForwardFill />
                    {this.state.goal.shareCount}
                  </span>
                </div>
                <div className={styles.actions}>
                  <div className={styles.like}>
                    <div
                      className={`${styles.actionBtns} ${styles.clickable}`}
                      onClick={this.boundDownloadModalToggle}
                    >
                      <RiHeartLine />
                      Like
                    </div>
                  </div>
                  <div className={styles.share}>
                    <div
                      className={`${styles.actionBtns} ${styles.clickable}`}
                      onClick={this.boundDownloadModalToggle}
                    >
                      <RiShareForwardLine />
                      Share
                    </div>
                  </div>
                  <div className={styles.comment}>
                    <div
                      className={`${styles.actionBtns} ${styles.clickable}`}
                      onClick={this.boundDownloadModalToggle}
                    >
                      <FaRegCommentAlt />
                      Reply
                    </div>
                  </div>
                </div>
                {this.state.goal.commentCount > 0 ? (
                  <div
                    className={`${styles.reply} ${styles.clickable}`}
                    onClick={this.boundDownloadModalToggle}
                  >
                    <span>
                      View{" "}
                      {this.state.goal.commentCount > 2
                        ? `all ${this.state.goal.commentCount}`
                        : this.state.goal.commentCount}{" "}
                      {this.state.goal.commentCount > 1 ? "replies" : "reply"}
                    </span>
                    <IoIosArrowDroprightCircle />
                  </div>
                ) : null}
                <div
                  id='steps'
                  className={`${styles.steps} ${styles.collapse} ${
                    this.state.collapseOpen.steps ? styles.open : styles.close
                  }`}
                >
                  <div
                    className={styles.collapseHeader}
                    onClick={this.toggleCollapse.bind(this, "steps")}
                  >
                    <div className={styles.left}>
                      <GiStairs />
                      <span>Steps</span>
                      <span className={styles.divider}></span>
                      <span>{this.state.goal.steps.length}</span>
                    </div>
                    <div className={styles.arrow}>
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <div className={styles.collapseContent}>
                    {this.state.goal.steps.map((step, index) => {
                      return (
                        <div
                          key={`step-${index}`}
                          className={`${styles.step} ${
                            step.isCompleted
                              ? styles.completed
                              : styles.incomplete
                          }`}
                        >
                          {step.isCompleted ? (
                            <AiFillCheckCircle />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                          <div className={styles.stepContent}>
                            <span className={styles.description}>
                              {step.description}
                            </span>
                            <hr />
                            {typeof step.commentCnt === "undefined" ? null : (
                              <span
                                className={styles.clickable}
                                onClick={this.boundDownloadModalToggle}
                              >
                                <FaRegCommentAlt />
                                {step.commentCnt}{" "}
                                {step.commentCnt === 1 ? "reply" : "replies"}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div
                  className={`${styles.needs} ${styles.collapse} ${
                    this.state.collapseOpen.needs ? styles.open : styles.close
                  }`}
                >
                  <div
                    className={styles.collapseHeader}
                    onClick={this.toggleCollapse.bind(this, "needs")}
                  >
                    <div className={styles.left}>
                      <FaHandsHelping />
                      <span>Needs</span>
                      <span className={styles.divider}></span>
                      <span>{this.state.goal.needs.length}</span>
                    </div>
                    <div className={styles.arrow}>
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <div className={styles.collapseContent}>
                    {this.state.goal.needs.map((need, index) => {
                      return (
                        <div
                          key={`need-${index}`}
                          className={`${styles.need} ${
                            need.isCompleted
                              ? styles.completed
                              : styles.incomplete
                          }`}
                        >
                          {need.isCompleted ? (
                            <AiFillCheckCircle />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                          <div className={styles.needContent}>
                            <span className={styles.description}>
                              {need.description}
                            </span>
                            <hr />
                            {typeof need.commentCnt === "undefined" ? null : (
                              <span
                                className={styles.clickable}
                                onClick={this.boundDownloadModalToggle}
                              >
                                <FaRegCommentAlt />
                                {need.commentCnt}{" "}
                                {need.commentCnt === 1 ? "reply" : "replies"}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              {this.state.hasSession
                ? this.profileCard()
                : this.singupLearnMoreCard()}
            </div>
          </div>
        </div>
        {this.state.downloadModalOpen ? (
          <DownloadModal
            goalId={this.state.goal._id}
            toggleOpenState={this.boundDownloadModalToggle}
          />
        ) : null}
      </main>
    )
  }
}
