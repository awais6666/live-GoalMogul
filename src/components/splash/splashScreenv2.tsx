import React from "react"
import { Helmet } from "react-helmet"
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"
import Joi from "joi"
import Modal from "react-bootstrap/Modal"
import styles from "./SplashScreen.module.scss"
import AppPreview1 from "../../assets/images/app_preview_landing_1_new.png"
import appPreview2 from "../../assets/images/app_preview_landing_2_new.png"
import appPreview3 from "../../assets/images/app_preview_landing_3_new.png"
import appPreview4 from "../../assets/images/app_preview_landing_4_new.png"
import appPreview5 from "../../assets/images/app_preview_landing_5_new.png"
import AppDownload from "../appDownload/AppDownload"
import { RouteComponentProps } from "react-router-dom"
import { getInvitor, subToNewsLetter } from "../../api"
import {
  storeInviteCode,
  getInviteCode,
} from "../../utils/state-management-utils"
import InviteHero from "../invite/InviteHero"
import FbLikeUSButton from "../appDownload/appFbLikeIcon"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ScrollAnimation from "react-animate-on-scroll"
import "animate.css/animate.min.css"
import Typist from "react-typist"
import EmailVerificationScreen from "./../verifications/EmailVerificationScreen"
// import frameMob from "./../../assets/wireframe/goalmogul3.png"
import frameMob from "./../../assets/wireframe/ttt (1).png"
// import frameContent from "./../../assets/wireframe/goalmogul1.png"
import frameContent from "./../../assets/wireframe/goalmogul1.jpg"
import frameMob2 from "./../../assets/wireframe/wireframe2.png"
import frameContent3 from "./../../assets/wireframe/Frame 504.png"
import frameContent4 from "./../../assets/wireframe/Frame 492.png"
import frameMob3 from "./../../assets/wireframe/Group 2256.png"
import frameContent5 from "./../../assets/wireframe/Frame 493.png"
import frameContent6 from "./../../assets/wireframe/Frame 506.png"
import playstore from './../../assets/Google-Play.png'
import chamber from './../../assets/chamber.png'
import appstore from './../../assets/app-store.svg'
import image3 from './../../assets/newWireframe/Group 2357.png'
import { signup_started } from "../../analyticsEvents"


interface PropsInterface extends RouteComponentProps<{ code?: string }> { }

/**
 * This is the landing page. Show links to app store and list of features.
 */
export default class SplashScreenV2 extends React.Component<PropsInterface> {
  state = {
    hasInviteCode: false,
    inviter: {
      firstName: "",
    },
    statusMessage: "",
    inviteCode: "",
    subscriberEmail: "",
    showModal: false,
    modalDialogue: {
      title: "",
      body: "",
    },
    nextScreenWF2: 1,
  }

  componentDidMount() {
    const storedInviteCode = getInviteCode()
    if (this.props.match.params.code) {
      this.dispatchGetInvitor(this.props.match.params.code)
    } else if (storedInviteCode) {
      this.dispatchGetInvitor(storedInviteCode)
    }
  }

  async dispatchGetInvitor(code: string) {
    try {
      const respJson = await getInvitor({
        inviteCode: code,
      })
      this.setState({
        hasInviteCode: true,
        inviter: {
          firstName: respJson.data.name.split(" ")[0],
        },
        inviteCode: code,
      })
      storeInviteCode(this.props.match.params.code)
    } catch (message) {
      this.setState({ statusMessage: message, success: false })
    }
  }

  NextScreen(number: number) {
    this.setState({ nextScreenWF2: number })
    // nextScreenWF2(number)
  }

  starSvg(num: number) {
    return (
      <div>
        {[...Array(num)].map((e, i) => {
          return (
            <svg
              key={`star-${i}`}
              version='1.1'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z' />
            </svg>
          )
        })}
      </div>
    )
  }

  /*
    This method hadnles the subscription to newsletter 
    It also handles the modal display
  */
  subscribe = async () => {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
    })

    const { error } = schema.validate({
      email: this.state.subscriberEmail,
    })
    if (error) {
      return this.setState({
        ...this.state,
        showModal: true,
        modalDialogue: {
          title: "Error",
          body: error.message,
        },
      })
    }
    try {
      const result = await subToNewsLetter(this.state.subscriberEmail)
      this.setState({
        ...this.state,
        showModal: true,
        modalDialogue: {
          title: "Thank You",
          body: result,
        },
      })
    } catch (error) {
      this.setState({
        ...this.state,
        showModal: true,
        modalDialogue: {
          title: "Error",
          body: error.message,
        },
      })
    }
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      // speed: 3000,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      swipeToSlide: true,
      cssEase: "linear",
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className={styles.vOrig}>

        <main className={styles.splashMain}>
          <Modal
            show={this.state.showModal}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            contentClassName={styles.modal_custom}
          >
            <Modal.Header
              closeButton
              onHide={() =>
                this.setState({
                  ...this.state,
                  showModal: false,
                  subscriberEmail: "",
                })
              }
            >
              <Modal.Title id='contained-modal-title-vcenter'>
                <h3>{this.state.modalDialogue.title}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>{this.state.modalDialogue.body}</h5>
            </Modal.Body>
          </Modal>
          {this.props.location.pathname.includes("invite") ? (
            <Helmet>
              <title>
                {this.state.inviter.firstName
                  ? `${this.state.inviter.firstName}'s Invitation to GoalMogul`
                  : "Invitation to GoalMogul"}
              </title>
              <meta
                name='description'
                content='Share goals with your friends and help each other out. Tap here to redeem your invitation to GoalMogul today.'
              />
            </Helmet>
          ) : (
            <Helmet>
              <title>
                GoalMogul App - #1 Goal Planner | Goal Sharing Social Network |
                Digital Life Coach
            </title>
              <meta
                name='description'
                content='Stretch your dreams, find your purpose, set bigger goals, and help your friends. Love life. Track your goals, habits, and daily progress. The best personal development, goal setting, and life planning app. Achieve your best results with GoalMogul.'
              />
              <meta
                name='keywords'
                content='digital goal planner, goal planning apps, goal setting planner, life goal planner, best goal planner app, daily goal planner app, goal sharing, app to help friends'
              />
              <link rel='canonical' href='https://www.goalmogul.com/ ' />
            </Helmet>
          )}
          <div className={styles.row}>
            {this.state.hasInviteCode ? (
              <InviteHero code={this.state.inviteCode}></InviteHero>
            ) : null}
          </div>
          <section className={styles.sectionOne}>
            <div className={styles.sectionContent}>
              {/* <Typist cursor={{ show: false }} avgTypingDelay={50}> */}
              <h1>
                Grow closer to your friends than ever before...
              {/* </Typist> */}
              </h1>
              {/* <Typist.Delay ms={500} /> */}
              <h2>
                Find out their goals in life and enjoy helping each other!
            </h2>
              {/* </Typist> */}
            </div>
          </section>
          <section className={styles.sectionTwo}>
            <div className={styles.sectionContent}>
              <div className={styles.textWrapper}>
                <div className={styles.inputDiv}>
                  <ScrollAnimation
                    animateIn='animate__fadeInLeft'
                    animateOut='fadeOut'
                    animateOnce={true}
                    delay={400}
                  >
                    <p>
                      Do the most important thing in a friendship... <br /> Help
                    each other grow
                    <br />
                    </p>
                    <p>
                      <b>Join the #1 Goal Sharing Social Network</b> <br /> App
                    Launching Soon
                  </p>
                  </ScrollAnimation>
                  <ScrollAnimation
                    animateIn='animate__fadeInLeft'
                    animateOut='fadeOut'
                    animateOnce={true}
                    delay={500}
                  >
                    <div className={styles.inputContainer}>
                      {/* <input
                      placeholder='Email address'
                      autoComplete='off'
                      value={this.state.subscriberEmail}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          subscriberEmail: e.target.value,
                        })
                      }
                    /> */}
                      <button
                        // onClick={this.subscribe}
                        onClick={() => {
                          window.analytics.track(signup_started)
                        }}
                        className={`vrlps-trigger ${styles.EnterToWin}`}
                      >
                        <b>SIGN UP</b>
                      </button>
                    </div>
                    <p className={styles.appLaunching}>
                      <b>JOIN TODAY for a chance to win $100 </b>
                      <br />

                      We're running a referral contest.<br /> New winner picked every Friday.
                  <br />

                      Invite friends that you want to share goals with.
                  <br />

                      The more you invite, the greater your chances of winning!
                  </p>

                  </ScrollAnimation>
                </div>

                {/* <AppDownload></AppDownload> */}
              </div>
              <div className={styles.imageWrapper}>
                {/* <ScrollAnimation
                animateIn='animate__zoomIn'
                animateOut='fadeOut'
                delay={300}
                animateOnce={true}
              > */}
                <div className={styles.v2wireframe1Splash}>
                  <div
                    id='wireframe1contentDiv'
                    className={styles.v2wireframe1contentDiv}
                  >
                    <img
                      className={styles.v2wireframe1content}
                      src={frameContent}
                      alt=''
                    />
                  </div>
                  <div className={styles.v2wireframe1mainDiv}>
                    <img
                      className={styles.v2wireframe1frame}
                      src={frameMob}
                      alt=''
                    />
                  </div>
                </div>

                {/* </ScrollAnimation> */}
                {/* <AppPreview1 /> */}
              </div>
            </div>
          </section>
          <section className={styles.sectionThree}>
            <div className={styles.sectionContent}>
              <ScrollAnimation
                animateIn='animate__zoomIn'
                animateOut='fadeOut'
                delay={300}
                animateOnce={true}
              >
                <div className={styles.imageWrapper}>
                  <img src={image3} />
                </div>
              </ScrollAnimation>
              <div className={styles.textWrapper}>
                <ScrollAnimation
                  animateIn='animate__fadeInRight'
                  animateOut='fadeOut'
                  delay={400}
                  animateOnce={true}
                >
                  <div className={styles.bluebarDiv}>
                    <div className={styles.blueBar}></div>
                  </div>
                  <h1>
                    A No-Nonsense Shortcut to Catapult <br /> Your Friendships to
                  the Next Level
                </h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={500}
                  animateOnce={true}
                >
                  <p>
                    <span>🔥</span> Discover what all your friends are trying to
                  achieve... <br className={styles.hideMob} /> in just a few minutes a day
                </p>
                  <p>
                    <span>🔥</span> Be the best friend you can be by helping each
                  other <br className={styles.hideMob} /> accomplish more
                </p>
                  <p>
                    <span>🔥</span> Avoid losing touch with what they want in life
                </p>
                  <p>
                    <span>🔥</span> Give your friendships more meaning
                </p>
                </ScrollAnimation>
              </div>
            </div>
          </section>
          <section className={styles.sectionFour}>
            <div className={styles.sectionContent}>
              <div className={styles.textWrapper}>
                <ScrollAnimation
                  animateIn='animate__fadeInLeft'
                  animateOut='fadeOut'
                  delay={400}
                  animateOnce={true}
                >
                  <div className={styles.bluebarDiv}>
                    <div className={styles.blueBar}></div>
                  </div>
                  <h1>
                    Think Big and Kick Ass with the <br /> World's Most Powerful
                  Goal Planner
                </h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={500}
                  animateOnce={true}
                >
                  <p>
                    <span>🔥</span> Not sure what new goals to set?
                </p>
                  <p>
                    <span>🔥</span> Revolutionary Goal Planner designed to help
                  you <br className={styles.hideMob} /> discover new passions
                </p>
                  <p>
                    <span>🔥</span> Get clear about what you really want
                </p>
                  <p>
                    <span>🔥</span> Set goals that make you want to jump out of
                  bed every morning
                </p>
                  <p>
                    <span>🔥</span> Get proven strategies to help you crush
                  self-doubt
                </p>
                </ScrollAnimation>
              </div>
              <div className={styles.imageWrapper}>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={300}
                  animateOnce={true}
                >
                  <img src={appPreview3} />
                </ScrollAnimation>
              </div>
            </div>
          </section>
          <section className={styles.sectionFive}>
            <div className={styles.sectionContent}>
              <div className={styles.imageWrapper}>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={300}
                  animateOnce={true}
                >
                  <img src={appPreview4} />
                </ScrollAnimation>
              </div>
              <div className={styles.textWrapper}>
                <ScrollAnimation
                  animateIn='animate__fadeInRight'
                  animateOut='fadeOut'
                  delay={400}
                  animateOnce={true}
                >
                  <div className={styles.bluebarDiv}>
                    <div className={styles.blueBar}></div>
                  </div>
                  <h1>
                    Your Future in Your Hands, <br /> with Your Friends to Support
                  You
                </h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={500}
                  animateOnce={true}
                >
                  <p>
                    <span>🔥</span> Break your big goals into smaller steps
                </p>
                  <p>
                    <span>🔥</span> Prioritize, categorize, and set deadlines
                </p>
                  <p>
                    <span>🔥</span> List your Needs so others can help
                </p>
                  <p>
                    <span>🔥</span> Get reminders and motivation to keep you on
                  track
                </p>
                </ScrollAnimation>
              </div>
            </div>
          </section>
          <section className={styles.sectionSix}>
            <div className={styles.sectionContent}>
              <div className={styles.textWrapper}>
                <ScrollAnimation
                  animateIn='animate__fadeInLeft'
                  animateOut='fadeOut'
                  delay={400}
                  animateOnce={true}
                >
                  <div className={styles.bluebarDiv}>
                    <div className={styles.blueBar}></div>
                  </div>
                  <h1>
                    Meet Other Achievers Who Will <br /> Help You Dominate
                </h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={500}
                  animateOnce={true}
                >
                  <p>
                    <span>🔥</span> Mastermind with personal development
                  enthusiasts
                </p>
                  <p>
                    <span>🔥</span> Find your Tribe
                </p>
                  <p>
                    <span>🔥</span> Network with a purpose
                </p>
                  <p>
                    <span>🔥</span> Surround yourself with positive mental
                  attitudes
                </p>
                </ScrollAnimation>
              </div>
              <div className={styles.imageWrapper5}>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={300}
                  animateOnce={true}
                >
                  <img src={appPreview5} />
                </ScrollAnimation>
              </div>
            </div>
          </section>
          <section className={styles.sectionSeven}>
            <div className={styles.sectionContent}>
              <h1>What users are saying</h1>
              <div className={styles.bluebarDiv}>
                <div className={styles.blueBar}></div>
              </div>
              {/* <div > */}
              <Slider {...settings} className={styles.testimonials}>
                <div>
                  {this.starSvg(5)}
                  <p>
                    “Far more than I expected. The ingenious goal planner is truly
                    innovative and far exceeds anything I've ever seen before.”
                </p>
                </div>
                <div>
                  {this.starSvg(5)}
                  <p>
                    "This is a MUST HAVE if you want to eliminate the noise and
                    just focus on helping your friends. It's the only app you'll
                    ever need to maintain productive friendships."
                </p>
                </div>
                <div>
                  {this.starSvg(5)}
                  <p>
                    "Working from home made it tough to meet new folks with
                    similar goals. I’ve now got access to an exciting community of
                    fellow personal development enthusiasts."
                </p>
                </div>
                <div>
                  {this.starSvg(5)}
                  <p>
                    "For a long time, I didn' t know what I truly wanted in life.
                    GoalMogul helped me reflect and rediscover myself. I now know
                    exactly what I am passionate about and am able to plan my days
                    to work towards that."
                </p>
                </div>
                <div>
                  {this.starSvg(5)}
                  <p>
                    "I got tired of the political rants, negativity, and pics of
                    what people ate. A social network is supposed to let me know
                    what my friends want to do in life. I use GoalMogul so I can
                    make genuine friendships and make my time on social media
                    productive and meaningful."
                </p>
                </div>
                <div>
                  {this.starSvg(5)}
                  <p>
                    "GoalMogul redefines social networking, so it's no longer an
                    unproductive waste of time."
                </p>
                </div>
              </Slider>
              {/* </div> */}
            </div>
          </section>
          <section className={styles.sectionEight}>
            <div className={styles.sectionContent}>
              <div className={styles.bluebarDiv}>
                <div className={styles.blueBar}></div>
              </div>
              <div className={styles.textWrapper}>
                <p>
                  <b>JOIN TODAY for a chance to win $100 </b>
                  {/* <b>SIGN UP TODAY for a chance wo win $100! </b> */}
                  <br />
                  We're giving $100 away every week.
                </p>
                <div className={styles.inputContainer}>
                  {/* <input
                  placeholder='Email address'
                  autoComplete='off'
                  value={this.state.subscriberEmail}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      subscriberEmail: e.target.value,
                    })
                  }
                /> */}
                  <button
                    // onClick={this.subscribe}
                    type='button'
                    className={`vrlps-trigger ${styles.lastSecButton}`}
                  >
                    <b>SIGN UP</b>
                  </button>
                </div>
                <p className={styles.appLaunching}>
                  {/* <b>JOIN TODAY for a chance to win $100 </b> */}
                  <br />

                      We're running a referral contest.<br /> New winner picked every Friday.
                  <br />

                      Invite friends that you want to share goals with.
                  <br />

                      The more you invite, the greater your chances of winning!
                  </p>

                <div className={styles.AppDownloadDiv}>
                  <div className={styles.buttonDown} style={{ backgroundImage: `url(${playstore})` }} > </div>
                  <div className={styles.buttonDown} style={{ backgroundImage: `url(${appstore})` }} > </div>
                  {/* <img src={appstore} /> */}
                </div>
              </div>
              <div className={styles.socialMediaBtns}>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={100}
                  animateOnce={true}
                >
                  <a
                    href='https://www.facebook.com/goalmogul/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaFacebookF />
                  </a>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={200}
                  animateOnce={true}
                >
                  <a
                    href='https://twitter.com/GoalMogul'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaTwitter />
                  </a>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={300}
                  animateOnce={true}
                >
                  <a
                    href='https://www.linkedin.com/company/goalmogul/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaLinkedinIn />
                  </a>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={400}
                  animateOnce={true}
                >
                  <a
                    href='https://www.instagram.com/goalmogulofficial/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaInstagram />
                  </a>
                </ScrollAnimation>
                <ScrollAnimation
                  animateIn='animate__zoomIn'
                  animateOut='fadeOut'
                  delay={500}
                  animateOnce={true}
                >
                  <a
                    href='https://www.youtube.com/channel/UCGT2M4q4kdoH52uOfjPoJ_w'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaYoutube />
                  </a>
                </ScrollAnimation>
              </div>
            </div>
            {/* </ScrollAnimation> */}
            <FbLikeUSButton />
          </section>
        </main>
      </div>
    )
  }
}
