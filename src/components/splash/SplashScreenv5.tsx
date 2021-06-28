import React, { useRef } from "react"
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

import { RouteComponentProps } from "react-router-dom"
import { getInvitor, subToNewsLetter } from "../../api"
import {
    storeInviteCode,
    getInviteCode,
} from "../../utils/state-management-utils"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ScrollAnimation from "react-animate-on-scroll"
import "animate.css/animate.min.css"

import playstore from './../../assets/Google-Play.png'
import chamber from './../../assets/chamber.png'
import appstore from './../../assets/App-Store-Badge.png'
import bobProctor from './../../assets/bobProctor.png'
import victor from './../../assets/victor.png'
import johnAssaraf from './../../assets/johnAssaraf.png'

// import CBCLogo from './../../assets/cbc.png'
// import FOXLogo from './../../assets/Mask Group.png'
// import NBCLogo from './../../assets/5aLogo.png'
// import PBSLogo from './../../assets/image 2 (1).png'
// import DJLLogo from './../../assets/Digital-Journal-Logo.png'
import Group2320 from './../../assets/Group2320.png'

import CBCLogo from './../../assets/CBS_logo.png'
import FOXLogo from './../../assets/FOX_wordmark.png'
import NBCLogo from './../../assets/NBC.png'
import PBSLogo from './../../assets/PBS.png'
import DJLLogo from './../../assets/Digital-Journal-Logo.png'

// import uniqueApp1 from './../../assets/newWireframe/Group 2345.png'
// import uniqueApp2 from './../../assets/newWireframe/Group 2347.png'
// import uniqueApp3 from './../../assets/newWireframe/Group 2348.png'
// import uniqueApp4 from './../../assets/newWireframe/Group 2349.png'
// import uniqueApp5 from './../../assets/newWireframe/Group 2350.png'

import uniqueApp1 from './../../assets/newWireframe/future state.png'
import uniqueApp2 from './../../assets/newWireframe/Goal Planner.png'
import uniqueApp3 from './../../assets/newWireframe/friends profile.png'
import uniqueApp4 from './../../assets/newWireframe/Feed.jpg'
import uniqueApp5 from './../../assets/newWireframe/notification.png'
import uniqueApp6 from './../../assets/newWireframe/Conversation.png'
import uniqueApp7 from './../../assets/newWireframe/Accountability.png'
import maskgroup from './../../assets/newWireframe/Mask Group.png'

import chamberGray from './../../assets/chamberGray.png'
import JohnAssaraf from './../../assets/JA-LogoGray.png'
import mvhLogo from './../../assets/mvh-logoGray.png'
import PGI from './../../assets/PGI-Logo-300-169.png'

import image1 from './../../assets/newWireframe/Group 2355.png'
import image2 from './../../assets/newWireframe/Group 2347 (1).png'
import image3 from './../../assets/newWireframe/Group 2357.png'
import image4 from './../../assets/newWireframe/Group 2354.png'
import slider1 from './../../assets/newWireframe/Group 2361.png'
import slider2 from './../../assets/newWireframe/Group 2364.png'
// import logov5 from './../../assetslogoV5.png'
import tigerImage from './../../assets/newWireframe/tigerImage.png'
import './splashscreen.scss'

// import image from './../../assets/newWireframe/Group 2355.png'
interface PropsInterface extends RouteComponentProps<{ code?: string, uniqueSlider?: any }> { }

/**
 * This is the landing page. Show links to app store and list of features.
 */
export default class SplashScrenV5 extends React.Component<PropsInterface> {
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
    constructor(props: any) {
        super(props)

        // Create the ref
        // @ts-ignore
        this.uniqueSlider = React.createRef()
        // @ts-ignore
        this.uniqueSliderHeading = React.createRef()
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
            <div className={styles.v4ReviewStars}>
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
    changeSlide = (element: any, id: string, navId: string) => {
        if (id === 'slide2') {
            document.getElementById('slide1')?.classList.remove('active');
            document.getElementById(id)?.classList.add('active')
            document.getElementById('slide1Nav')?.classList.remove('navActive');
            document.getElementById(navId)?.classList.add('navActive')
        } else if (id === 'slide1') {
            document.getElementById('slide2')?.classList.remove('active');
            document.getElementById(id)?.classList.add('active')
            document.getElementById('slide2Nav')?.classList.remove('navActive');
            document.getElementById(navId)?.classList.add('navActive')
        }
    }

    // text=()=>{
    //     console.log(this.stat)
    // }


    render() {
        var settings = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            // variableWidth: true,
            slidesToScroll: 2,
            centerMode: true,
            centerPadding: "0px",
            focusOnSelect: true,
            dotsClass: "reviewSlick slick-dots",
            autoPlay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        }

        // const settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 3,
        //     slidesToScroll: 1

        //   };
        var settingsWireFrame = {
            dots: true,
            arrows: false,
            infinite: true,
            // speed: 500,
            slidesToShow: 3,
            variableWidth: true,
            slidesToScroll: 2,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: "0",
            draggable: false,
            // speed: 1000,
            autoplay:true,
            autoplaySpeed:2000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,

                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: "0px",
                        respondTo: 'min'

                    },
                },
            ],
        };
        var settingsIamgesMob = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            // variableWidth: true,
            slidesToScroll: 1,
            centerMode: true,
            // centerPadding: "50px",
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,

                    },
                }
            ]
        }

        let headingslide = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
        }
        return (
            <div className={styles.v5Main}>
                {/* <div className={styles.v5Nav}>
                    <div>
                        <img src={logov5}/>
                    </div>
                </div> */}
                <div className={styles.v5MainInner}>
                    <div className={styles.v5Heading}>
                        <h3>Goal Sharing <br />Social Network for Overachievers</h3>
                        <h5>Delight in helping each other </h5>
                        <div className={styles.AppDownloadDiv}>
                            {/* <div className={styles.buttonDown} style={{ backgroundImage: `url(${playstore})` }} > </div>
                            <div className={styles.buttonDown} style={{ backgroundImage: `url(${appstore})` }} > </div> */}
                            <img className={styles.buttonImage} src={playstore} />
                            <img className={styles.buttonImage} src={appstore} />
                        </div>
                    </div>
                    <div className={styles.logoCon}>
                        <div className={styles.innerLogoDivMob}>
                            {/* <Slider  {...settingsMob}> */}
                            <img src={CBCLogo} className={styles.cbcImage} />
                            <img src={NBCLogo} className={styles.nbcImage} />
                            <img src={DJLLogo} className={styles.nbcImage} />
                            <img src={FOXLogo} className={styles.foxImage} />
                            <img src={PBSLogo} className={styles.pbsImage} />
                            {/* <img src={NBCLogo} className={styles.nbcImage} />
                            <img src={FOXLogo} className={styles.foxImage} />
                            <img src={PBSLogo} className={styles.pbsImage} />
                            <img src={CBCLogo} className={styles.cbcImage} /> */}
                            {/* </Slider> */}



                        </div>
                    </div>

                    {/* E > div */}

                    <div className="reviewSliderCon">

                        <div className="reviewSlider">
                            <Slider {...settings}>
                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>
                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                Sharing rides and sharing homes revolutionized the world by making traveling better. With GoalMogul, sharing goals and helping each other will make your life better. The possibilities are endless.
                                        </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={johnAssaraf} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>John Assaraf</b></h3>
                                            <p>Leading Brain & Achievement Expert, Thought-Leader on The Ellen Degeneres Show, Anderson Cooper, and Larry King Live</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>

                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                Sharing goals with friends is one of life’s greatest keys to success. If you have unrealized dreams and goals, then take a leap of faith and share them with the world. This little known trick will help you manifest and materialize your desires. GoalMogul has brilliantly laid out a path that will nurture your mind for success. Follow it and watch your dreams unfold and your relationships blossom.
                                         </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={victor} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>Mark Victor Hansen</b></h3>
                                            <p>59x NY Times #1 Bestselling Author, 500 Million Books Sold, Co-Creator of Chicken Soup Series</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>

                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                The people we associate with can make or break us. GoalMogul offers a fertile and healthy environment where you can truly surround yourself with like-minded individuals who are interested in supporting you and following their dreams.
                                        </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={bobProctor} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>Bob Proctor</b></h3>
                                            <p>
                                                Featured Teacher in 'The Secret' and Bestselling Author of 'You Were Born Rich'</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>
                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                Sharing rides and sharing homes revolutionized the world by making traveling better. With GoalMogul, sharing goals and helping each other will make your life better. The possibilities are endless.
                                        </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={johnAssaraf} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>John Assaraf</b></h3>
                                            <p>Leading Brain & Achievement Expert, Thought-Leader on The Ellen Degeneres Show, Anderson Cooper, and Larry King Live</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>

                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                Sharing goals with friends is one of life’s greatest keys to success. If you have unrealized dreams and goals, then take a leap of faith and share them with the world. This little known trick will help you manifest and materialize your desires. GoalMogul has brilliantly laid out a path that will nurture your mind for success. Follow it and watch your dreams unfold and your relationships blossom.
                                         </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={victor} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>Mark Victor Hansen</b></h3>
                                            <p>59x NY Times #1 Bestselling Author, 500 Million Books Sold, Co-Creator of Chicken Soup Series</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviewBox">
                                    <div className="reviewSlide">
                                        <div>

                                            <div className="reviewStars">
                                                {this.starSvg(5)}
                                            </div>
                                            <div className="reviewText">
                                                The people we associate with can make or break us. GoalMogul offers a fertile and healthy environment where you can truly surround yourself with like-minded individuals who are interested in supporting you and following their dreams.
                                        </div>
                                        </div>
                                        <div className="revieImage">
                                            <img src={bobProctor} />
                                        </div>
                                        <div className="reviewerDetail">
                                            <h3><b>Bob Proctor</b></h3>
                                            <p>
                                                Featured Teacher in 'The Secret' and Bestselling Author of 'You Were Born Rich'</p>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>

                    <div className="uniqueAppSec">
                        <div className="innerUniqueSec">
                            {/* @ts-ignore */}
                            <Slider ref={slider => (this.uniqueSliderHeading = slider)} {...headingslide} asNavFor={this.uniqueSlider}>

                                <div>
                                    <h2>GOAL SHARING SOCIAL NETWORK</h2>
                                    <p>Connect meaningfully. Spread<br/>
                                    H.O.P.E: Help Other People Everyday</p>
                                </div>
                                <div>
                                    <h2>DREAM STRETCHING GOAL PLANNER</h2>
                                    <p>Stretch your dreams, find new passions,<br/>
                                    Love Life</p>
                                </div>
                                <div>
                                    <h2>KEEP A PULSE ON WHAT FRIENDS WANT</h2>
                                    <p>See their goals listed by priority</p>
                                    {/* <p></p> */}
                                </div>
                                <div>
                                    <h2>HELPING FRIENDS JUST GOT EASIER</h2>
                                    <p>Swipe left for video or voice comments<br/>
                                    Give encouragement, motivation, referrals, or advice</p>
                                </div>
                                <div>
                                    <h2>DISCOVER TRENDING NEEDS IN ONE TAP</h2>
                                    <p>Pay it forward,<br/>
                                    That's how we do it</p>
                                </div>
                                <div>
                                    <h2>FIND ACCOUNTABILITY BUDDIES</h2>
                                    <p>Mastermind, hold them to it</p>
                                    {/* <p></p> */}
                                </div>
                                <div>
                                    <h2>DELIGHT IN HELPING FRIENDS ACHIEVE MORE</h2>
                                    <p>Earn cash & rewards through it</p>
                                    {/* <p></p> */}
                                </div>
                            </Slider>
                            <div className="uniqueAppSlider">
                                {/* <Slider {...settingsWireFrame}>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp1} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp2} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp3} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp4} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp5} />
                                        </div>
                                    </div>
                                </Slider> */}
                                {/* @ts-ignore */}
                                <Slider ref={slider => (this.uniqueSlider = slider)}  {...settingsWireFrame} asNavFor={this.uniqueSliderHeading}>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp1} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp2} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp3} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp4} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp5} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp6} />
                                        </div>
                                    </div>
                                    <div className="wireframeDiv">
                                        <div className="wireframe">
                                            <img src={uniqueApp7} />
                                        </div>
                                    </div>
                                </Slider>
                                <div className="mobFrame">
                                    <img src={maskgroup} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewerLogo}>
                        <div className={styles.innerReviewLogo}>
                            <div className={styles.chamberDiv}>
                                <img className={styles.chmaberImage} src={chamberGray} />
                            </div>
                            <div className={styles.pgiDiv}>
                                <img className={styles.pgiImage} src={PGI} />
                            </div>
                            <div className={styles.johnDiv}>
                                <img className={styles.johnImage} src={JohnAssaraf} />
                            </div>
                            <div className={styles.mvhDiv}>
                                <img className={styles.mvhImage} src={mvhLogo} />
                            </div>
                        </div>

                    </div>
                    <div className="backgroundWhite">
                        <div className="sectionFourth">
                            <div className="wireframeText colRev">
                                <div className="textWire">
                                    <h2>Set Goals Like a Boss</h2>
                                    <p>Pick who you want to share them with <br />
Help each other and 10x the quality of your friendship
                                </p>
                                </div>
                                <div className="imgWire">
                                    <img src={image1} />
                                    {/* <div className="wireframeImage" style={{ backgroundImage: `url('${image1}')` }}></div> */}

                                </div>
                            </div>
                            <div className="wireframeText">
                                <div className="imgWire">
                                    <img src={image2} />
                                    {/* <div className="wireframeImage" style={{ backgroundImage: `url('${image2}')` }}></div> */}
                                </div>
                                <div className="textWire">
                                    <h2>Think Big and Kick Ass with the
World's Most Powerful   <br className={styles.hideMob} />  Goal Planner</h2>
                                    <p>Get proven strategies to help you crush self-doubt
                                </p>
                                </div>
                            </div>
                            <div className="wireframeText wireframeText3 colRev ">
                                <div className="textWire">
                                    <h2>Your Future in Your Hands, with Your Friends to Support You</h2>
                                    <p>Break your big goals into smaller steps.<br />
Prioritize, categorize, and set deadlines.<br />
List your Needs so others can help.<br />
Get reminders and motivation to keep you <br className="hideMob" /> on track.
                                    </p>
                                </div>
                                <div className="imgWire Image3">
                                    <img src={image3} />
                                    {/* <div className="wireframeImage" style={{ backgroundImage: `url('${image3}')` }}></div> */}

                                </div>
                            </div>
                            <div className="wireframeText ">
                                <div className="imgWire">
                                    <img src={image4} />
                                    {/* <div className="wireframeImage" style={{ backgroundImage: `url('${image4}')` }}></div> */}
                                </div>
                                <div className="textWire">
                                    <h2>Meet Other Achievers Who Will Help You Dominate</h2>
                                    <p>Mastermind with personal development enthusiasts <br className={styles.hideMob} />
                                    Network with a purpose
                                </p>
                                </div>
                            </div>
                        </div>

                        <div className="sectionFifth">
                            <div className="innerSection">
                                <div className="slider">
                                    <div className="innerSlider">
                                        <div id="slide1" className="slide leftImage active" onClick={(ev) => this.changeSlide(ev.currentTarget, 'slide1', 'slide1Nav')} >
                                            <img src={slider1} />
                                        </div>
                                        <div id="slide2" className="slide rightImage" onClick={(ev) => this.changeSlide(ev.currentTarget, 'slide2', 'slide2Nav')}>
                                            <img src={slider2} />
                                        </div>
                                    </div>
                                    <div className="sliderNavs">
                                        <div id="slide1Nav" className="navBtn navActive" onClick={(ev) => this.changeSlide(ev.currentTarget, 'slide1', 'slide1Nav')}><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5.96087" cy="5.27435" r="5.1474" />
                                        </svg>
                                        </div>
                                        <div id="slide2Nav" className="navBtn" onClick={(ev) => this.changeSlide(ev.currentTarget, 'slide2', 'slide2Nav')}><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5.96087" cy="5.27435" r="5.1474" />
                                        </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="">
                                <Slider  {...settingsIamgesMob}>
                                <div  className="slide" >
                                        <img src={slider1} />
                                    </div>
                                    <div className="slide" >
                                        <img src={slider2} />
                                    </div>
                                </Slider>
                            </div> */}
                            </div>
                        </div>

                    </div>
                    <div className="footerV5">
                        <div className="innerFooter backgroundWhite">

                            <div className="downloadFooterBtn" >
                                <h2>Don't think. Don't wonder. Just try it. <br /> Download Now.</h2>
                                <div className="AppDownloadDiv">
                                    {/* <div className="buttonDown" style={{ backgroundImage: `url(${playstore})` }} > </div>
                                    <div className="buttonDown" style={{ backgroundImage: `url(${appstore})` }} > </div> */}
                                    <img className="buttonImage" src={playstore} />
                                    <img className="buttonImage" src={appstore} />
                                </div>
                            </div>
                            <div className="tigerImgDiv">
                                <img src={tigerImage} />

                            </div>
                        </div>
                        {/* <div className='footerLinksMain'>
                            <div className="footerLinks">
                                <div className="socialLinks">
                                    <div className="socialButton"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.24103 2.36578H7.44512V0.268657C7.23739 0.24008 6.52296 0.175781 5.69093 0.175781C3.95487 0.175781 2.76562 1.26776 2.76562 3.27475V5.12182H0.849854V7.46624H2.76562V13.3652H5.11444V7.46679H6.95271L7.24453 5.12237H5.11389V3.50721C5.11444 2.82961 5.29689 2.36578 6.24103 2.36578Z" fill="#42C0F5" />
                                    </svg>
                                    </div>
                                    <div className="socialButton"><svg viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8504 2.14465C12.3812 2.35045 11.8813 2.48686 11.3601 2.55309C11.8963 2.23296 12.3055 1.7299 12.4979 1.12355C11.998 1.4216 11.446 1.63213 10.8578 1.74961C10.3831 1.24419 9.70661 0.931152 8.96858 0.931152C7.53666 0.931152 6.38388 2.0934 6.38388 3.51822C6.38388 3.72323 6.40122 3.92035 6.4438 4.10801C4.29357 4.00314 2.39092 2.97258 1.11276 1.40267C0.889618 1.78983 0.758727 2.23296 0.758727 2.71001C0.758727 3.60574 1.22 4.39976 1.90757 4.85945C1.49203 4.85157 1.08438 4.73093 0.739014 4.5409C0.739014 4.54879 0.739014 4.55904 0.739014 4.56929C0.739014 5.82615 1.63554 6.87013 2.81119 7.11062C2.60066 7.16818 2.37121 7.19578 2.13308 7.19578C1.9675 7.19578 1.80033 7.18631 1.64342 7.15162C1.97853 8.17588 2.92946 8.9289 4.06017 8.95334C3.18021 9.6417 2.0629 10.0564 0.853347 10.0564C0.64124 10.0564 0.437808 10.047 0.234375 10.021C1.38006 10.7598 2.73786 11.1816 4.2021 11.1816C8.96148 11.1816 11.5635 7.23914 11.5635 3.82179C11.5635 3.70746 11.5596 3.59707 11.5541 3.48747C12.0674 3.12318 12.4987 2.66822 12.8504 2.14465Z" fill="#42C0F5" />
                                    </svg>
                                    </div>
                                    <div className="socialButton"><svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M12.0581 12.2178V12.2173H12.0611V8.01103C12.0611 5.95329 11.5959 4.36816 9.07 4.36816C7.85571 4.36816 7.04083 5.00279 6.70816 5.60443H6.67303V4.56027H4.27808V12.2173H6.77188V8.42583C6.77188 7.42754 6.97058 6.46223 8.26867 6.46223C9.54769 6.46223 9.56675 7.60149 9.56675 8.48986V12.2178H12.0581Z" fill="#42C0F5" />
                                            <path d="M0.217285 4.56055H2.7141V12.2176H0.217285V4.56055Z" fill="#42C0F5" />
                                            <path d="M1.46466 0.748535C0.666342 0.748535 0.0185547 1.36548 0.0185547 2.12578C0.0185547 2.88608 0.666342 3.51593 1.46466 3.51593C2.26298 3.51593 2.91077 2.88608 2.91077 2.12578C2.91027 1.36548 2.26248 0.748535 1.46466 0.748535V0.748535Z" fill="#42C0F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="12.0425" height="11.4691" fill="white" transform="translate(0.0185547 0.748535)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    </div>
                                    <div className="socialButton"><svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M9.09374 0.924805H3.57083C1.77335 0.924805 0.311035 2.38712 0.311035 4.1846V9.70761C0.311035 11.505 1.77335 12.9673 3.57083 12.9673H9.09384C10.8912 12.9673 12.3535 11.505 12.3535 9.70761V4.1846C12.3535 2.38712 10.8912 0.924805 9.09374 0.924805V0.924805ZM6.33229 10.2388C4.51661 10.2388 3.03951 8.76173 3.03951 6.94606C3.03951 5.13038 4.51661 3.65328 6.33229 3.65328C8.14796 3.65328 9.62507 5.13038 9.62507 6.94606C9.62507 8.76173 8.14796 10.2388 6.33229 10.2388ZM9.70381 4.42982C9.16724 4.42982 8.73083 3.99341 8.73083 3.45684C8.73083 2.92028 9.16724 2.48377 9.70381 2.48377C10.2404 2.48377 10.6769 2.92028 10.6769 3.45684C10.6769 3.99341 10.2404 4.42982 9.70381 4.42982Z" fill="#42C0F5" />
                                            <path d="M6.3324 4.35938C4.9061 4.35938 3.74561 5.51978 3.74561 6.94617C3.74561 8.37247 4.9061 9.53297 6.3324 9.53297C7.75879 9.53297 8.9192 8.37247 8.9192 6.94617C8.9192 5.51978 7.75879 4.35938 6.3324 4.35938Z" fill="#42C0F5" />
                                            <path d="M9.70401 3.18994C9.55682 3.18994 9.43701 3.30975 9.43701 3.45694C9.43701 3.60412 9.55682 3.72393 9.70401 3.72393C9.85128 3.72393 9.97109 3.60422 9.97109 3.45694C9.97109 3.30966 9.85128 3.18994 9.70401 3.18994Z" fill="#42C0F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="12.0425" height="12.0425" fill="white" transform="translate(0.311035 0.924805)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    </div>
                                    <div className="socialButton"><svg viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M13.9493 3.83157C13.8007 3.27881 13.3648 2.84307 12.8122 2.69423C11.8025 2.41797 7.76369 2.41797 7.76369 2.41797C7.76369 2.41797 3.72506 2.41797 2.71539 2.68376C2.17334 2.83244 1.72689 3.27888 1.57821 3.83157C1.3125 4.84116 1.3125 6.93494 1.3125 6.93494C1.3125 6.93494 1.3125 9.03927 1.57821 10.0383C1.72705 10.591 2.16271 11.0267 2.71546 11.1756C3.73569 11.4519 7.76385 11.4519 7.76385 11.4519C7.76385 11.4519 11.8025 11.4519 12.8122 11.1861C13.3649 11.0374 13.8007 10.6016 13.9495 10.0489C14.2151 9.03927 14.2151 6.94557 14.2151 6.94557C14.2151 6.94557 14.2258 4.84116 13.9493 3.83157ZM6.47783 8.86924V5.00064L9.83629 6.93494L6.47783 8.86924Z" fill="#42C0F5" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.7629" height="13.7629" fill="white" transform="translate(0.88916 0.175293)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    </div>
                                </div>
                                <div className="footerCopyWrite">
                                    © 2021 GoalMogul, Inc.
                            </div>
                                <div className="termsCoditionFooter">
                                    <div className="termsLink">Contact Support</div>
                                    <div className="termsLink">Terms of Service</div>
                                    <div className="termsLink">Privacy Policy</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}