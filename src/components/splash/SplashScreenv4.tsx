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
import appstore from './../../assets/App-Store-Badge.png'
import reviewimage from './../../assets/image 2.png'
import reviewimage2 from './../../assets/image 3.png'
import reviewimage3 from './../../assets/image 4.png'
import waterDrop from './../../assets/qouteWaterDrop.png'
import circleBlob from './../../assets/Oval.png'
import rectangleBlob from './../../assets/Rectangle.png'
import CBCLogo from './../../assets/CBS_logo.png'
import FOXLogo from './../../assets/FOX_wordmark.png'
import NBCLogo from './../../assets/NBC.png'
import PBSLogo from './../../assets/PBS.png'
import DJLLogo from './../../assets/Digital-Journal-Logo.png'
import v4ComingSoon from './../../assets/v4comingSoon.png'
interface PropsInterface extends RouteComponentProps<{ code?: string }> { }

/**
 * This is the landing page. Show links to app store and list of features.
 */
export default class SplashScreenV4 extends React.Component<PropsInterface> {
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

    render() {
        var settings = {
            dots: true,
            infinite: true,
            // speed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            swipeToSlide: true,
            cssEase: "linear",
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
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
        let settingsMob = {
            dots: false,
            infinite: true,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            swipeToSlide: true,
            cssEase: "linear",
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
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
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
            ],
        }
        return (
            <div className={styles.v4Main}>
                <div className={styles.v4Page}>
                    <div className={styles.v4CommingSoonSec}>
                        <div className={styles.innerCommingSec}>
                            <div className={styles.commingSoonText}>
                                <div className={styles.innerCommingSoonText}>
                                    <h2>App Launching Soon</h2>
                                    <p>Be the first to download!<br /> We'll email you when the app is ready.</p>
                                    <div className={styles.sendEmail} >
                                        <input placeholder="Your email" />
                                        <button>Send</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.comingSoonImage}>
                                <img src={v4ComingSoon} />
                            </div>
                        </div>
                    </div>
                    <img src={circleBlob} className={styles.circleBlob} />

                    <div className={styles.v4HeadingDiv}>
                        <h2>Goal Sharing Social Network For Overachievers</h2>
                        <p>Delight in Helping Your Friends</p>
                        <div className={styles.AppDownloadDiv}>
                            <div className={styles.buttonDown} style={{ backgroundImage: `url(${playstore})` }} > </div>
                            <div className={styles.buttonDown} style={{ backgroundImage: `url(${appstore})` }} > </div>
                            {/* <img src={appstore} /> */}
                        </div>
                    </div>
                    <div className={styles.v4ReviewBox}>
                        <div className={styles.v4innerBoxLeft}>
                            <img className={styles.waterDrop} src={waterDrop} />
                            <div className={styles.v4InnerReviews}>
                                <div className={styles.v4Reviews}>
                                    <div className={styles.reviewerDet}>
                                        <div className={styles.reviewImage}><img src={reviewimage} /></div>
                                        <div className={styles.reviewName}>
                                            <h5>
                                                Bob Proctor
                                        </h5>
                                            <p>
                                                Law of Attraction Expert, Featured in 'The Secret' and Bestselling Author of 'You Were Born Rich’                                        </p>
                                        </div>
                                    </div>
                                    <div className={styles.reviewText}>
                                        <p>The people we associate with can make or break us. GoalMogul offers a fertile and healthy environment where you can truly surround yourself with like-minded individuals who are interested in supporting you and following their dreams.
                                             </p>
                                        {this.starSvg(5)}

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.v4innerBoxRight}>
                            <div className={styles.dotPttern}>
                                <svg width="157" height="143" viewBox="0 0 157 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 4.875C153.172 4.875 152.068 3.78422 152.068 2.4375C152.068 1.09078 153.172 0 154.534 0C155.896 0 157 1.09078 157 2.4375C157 3.78422 155.896 4.875 154.534 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 4.875C140.842 4.875 139.738 3.78422 139.738 2.4375C139.738 1.09078 140.842 0 142.204 0C143.566 0 144.67 1.09078 144.67 2.4375C144.67 3.78422 143.566 4.875 142.204 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 17.875C140.842 17.875 139.738 16.7842 139.738 15.4375C139.738 14.0908 140.842 13 142.204 13C143.566 13 144.67 14.0908 144.67 15.4375C144.67 16.7842 143.566 17.875 142.204 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 30.0625C140.842 30.0625 139.738 28.9717 139.738 27.625C139.738 26.2783 140.842 25.1875 142.204 25.1875C143.566 25.1875 144.67 26.2783 144.67 27.625C144.67 28.9717 143.566 30.0625 142.204 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 42.25C140.842 42.25 139.738 41.1592 139.738 39.8125C139.738 38.4658 140.842 37.375 142.204 37.375C143.566 37.375 144.67 38.4658 144.67 39.8125C144.67 41.1592 143.566 42.25 142.204 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 55.25C140.842 55.25 139.738 54.1592 139.738 52.8125C139.738 51.4658 140.842 50.375 142.204 50.375C143.566 50.375 144.67 51.4658 144.67 52.8125C144.67 54.1592 143.566 55.25 142.204 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 67.4375C140.842 67.4375 139.738 66.3467 139.738 65C139.738 63.6533 140.842 62.5625 142.204 62.5625C143.566 62.5625 144.67 63.6533 144.67 65C144.67 66.3467 143.566 67.4375 142.204 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 80.4375C140.842 80.4375 139.738 79.3467 139.738 78C139.738 76.6533 140.842 75.5625 142.204 75.5625C143.566 75.5625 144.67 76.6533 144.67 78C144.67 79.3467 143.566 80.4375 142.204 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 92.625C140.842 92.625 139.738 91.5342 139.738 90.1875C139.738 88.8408 140.842 87.75 142.204 87.75C143.566 87.75 144.67 88.8408 144.67 90.1875C144.67 91.5342 143.566 92.625 142.204 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 105.625C140.842 105.625 139.738 104.534 139.738 103.188C139.738 101.841 140.842 100.75 142.204 100.75C143.566 100.75 144.67 101.841 144.67 103.188C144.67 104.534 143.566 105.625 142.204 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 117.812C140.842 117.812 139.738 116.722 139.738 115.375C139.738 114.028 140.842 112.938 142.204 112.938C143.566 112.938 144.67 114.028 144.67 115.375C144.67 116.722 143.566 117.812 142.204 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 130C140.842 130 139.738 128.909 139.738 127.562C139.738 126.216 140.842 125.125 142.204 125.125C143.566 125.125 144.67 126.216 144.67 127.562C144.67 128.909 143.566 130 142.204 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 143C140.842 143 139.738 141.909 139.738 140.562C139.738 139.216 140.842 138.125 142.204 138.125C143.566 138.125 144.67 139.216 144.67 140.562C144.67 141.909 143.566 143 142.204 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 4.875C127.69 4.875 126.587 3.78422 126.587 2.4375C126.587 1.09078 127.69 0 129.053 0C130.415 0 131.519 1.09078 131.519 2.4375C131.519 3.78422 130.415 4.875 129.053 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 17.875C127.69 17.875 126.587 16.7842 126.587 15.4375C126.587 14.0908 127.69 13 129.053 13C130.415 13 131.519 14.0908 131.519 15.4375C131.519 16.7842 130.415 17.875 129.053 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 30.0625C127.69 30.0625 126.587 28.9717 126.587 27.625C126.587 26.2783 127.69 25.1875 129.053 25.1875C130.415 25.1875 131.519 26.2783 131.519 27.625C131.519 28.9717 130.415 30.0625 129.053 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 42.25C127.69 42.25 126.587 41.1592 126.587 39.8125C126.587 38.4658 127.69 37.375 129.053 37.375C130.415 37.375 131.519 38.4658 131.519 39.8125C131.519 41.1592 130.415 42.25 129.053 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 55.25C127.69 55.25 126.587 54.1592 126.587 52.8125C126.587 51.4658 127.69 50.375 129.053 50.375C130.415 50.375 131.519 51.4658 131.519 52.8125C131.519 54.1592 130.415 55.25 129.053 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 67.4375C127.69 67.4375 126.587 66.3467 126.587 65C126.587 63.6533 127.69 62.5625 129.053 62.5625C130.415 62.5625 131.519 63.6533 131.519 65C131.519 66.3467 130.415 67.4375 129.053 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 80.4375C127.69 80.4375 126.587 79.3467 126.587 78C126.587 76.6533 127.69 75.5625 129.053 75.5625C130.415 75.5625 131.519 76.6533 131.519 78C131.519 79.3467 130.415 80.4375 129.053 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 92.625C127.69 92.625 126.587 91.5342 126.587 90.1875C126.587 88.8408 127.69 87.75 129.053 87.75C130.415 87.75 131.519 88.8408 131.519 90.1875C131.519 91.5342 130.415 92.625 129.053 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 105.625C127.69 105.625 126.587 104.534 126.587 103.188C126.587 101.841 127.69 100.75 129.053 100.75C130.415 100.75 131.519 101.841 131.519 103.188C131.519 104.534 130.415 105.625 129.053 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 117.812C127.69 117.812 126.587 116.722 126.587 115.375C126.587 114.028 127.69 112.938 129.053 112.938C130.415 112.938 131.519 114.028 131.519 115.375C131.519 116.722 130.415 117.812 129.053 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 130C127.69 130 126.587 128.909 126.587 127.562C126.587 126.216 127.69 125.125 129.053 125.125C130.415 125.125 131.519 126.216 131.519 127.562C131.519 128.909 130.415 130 129.053 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 143C127.69 143 126.587 141.909 126.587 140.562C126.587 139.216 127.69 138.125 129.053 138.125C130.415 138.125 131.519 139.216 131.519 140.562C131.519 141.909 130.415 143 129.053 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 4.875C115.36 4.875 114.257 3.78422 114.257 2.4375C114.257 1.09078 115.36 0 116.723 0C118.085 0 119.188 1.09078 119.188 2.4375C119.188 3.78422 118.085 4.875 116.723 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 17.875C115.36 17.875 114.257 16.7842 114.257 15.4375C114.257 14.0908 115.36 13 116.723 13C118.085 13 119.188 14.0908 119.188 15.4375C119.188 16.7842 118.085 17.875 116.723 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 30.0625C115.36 30.0625 114.257 28.9717 114.257 27.625C114.257 26.2783 115.36 25.1875 116.723 25.1875C118.085 25.1875 119.188 26.2783 119.188 27.625C119.188 28.9717 118.085 30.0625 116.723 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 42.25C115.36 42.25 114.257 41.1592 114.257 39.8125C114.257 38.4658 115.36 37.375 116.723 37.375C118.085 37.375 119.188 38.4658 119.188 39.8125C119.188 41.1592 118.085 42.25 116.723 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 55.25C115.36 55.25 114.257 54.1592 114.257 52.8125C114.257 51.4658 115.36 50.375 116.723 50.375C118.085 50.375 119.188 51.4658 119.188 52.8125C119.188 54.1592 118.085 55.25 116.723 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 67.4375C115.36 67.4375 114.257 66.3467 114.257 65C114.257 63.6533 115.36 62.5625 116.723 62.5625C118.085 62.5625 119.188 63.6533 119.188 65C119.188 66.3467 118.085 67.4375 116.723 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 80.4375C115.36 80.4375 114.257 79.3467 114.257 78C114.257 76.6533 115.36 75.5625 116.723 75.5625C118.085 75.5625 119.188 76.6533 119.188 78C119.188 79.3467 118.085 80.4375 116.723 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 92.625C115.36 92.625 114.257 91.5342 114.257 90.1875C114.257 88.8408 115.36 87.75 116.723 87.75C118.085 87.75 119.188 88.8408 119.188 90.1875C119.188 91.5342 118.085 92.625 116.723 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 105.625C115.36 105.625 114.257 104.534 114.257 103.188C114.257 101.841 115.36 100.75 116.723 100.75C118.085 100.75 119.188 101.841 119.188 103.188C119.188 104.534 118.085 105.625 116.723 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 117.812C115.36 117.812 114.257 116.722 114.257 115.375C114.257 114.028 115.36 112.938 116.723 112.938C118.085 112.938 119.188 114.028 119.188 115.375C119.188 116.722 118.085 117.812 116.723 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 130C115.36 130 114.257 128.909 114.257 127.562C114.257 126.216 115.36 125.125 116.723 125.125C118.085 125.125 119.188 126.216 119.188 127.562C119.188 128.909 118.085 130 116.723 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 143C115.36 143 114.257 141.909 114.257 140.562C114.257 139.216 115.36 138.125 116.723 138.125C118.085 138.125 119.188 139.216 119.188 140.562C119.188 141.909 118.085 143 116.723 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 4.875C102.208 4.875 101.105 3.78422 101.105 2.4375C101.105 1.09078 102.208 0 103.571 0C104.933 0 106.037 1.09078 106.037 2.4375C106.037 3.78422 104.933 4.875 103.571 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 17.875C102.208 17.875 101.105 16.7842 101.105 15.4375C101.105 14.0908 102.208 13 103.571 13C104.933 13 106.037 14.0908 106.037 15.4375C106.037 16.7842 104.933 17.875 103.571 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 30.0625C102.208 30.0625 101.105 28.9717 101.105 27.625C101.105 26.2783 102.208 25.1875 103.571 25.1875C104.933 25.1875 106.037 26.2783 106.037 27.625C106.037 28.9717 104.933 30.0625 103.571 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 42.25C102.208 42.25 101.105 41.1592 101.105 39.8125C101.105 38.4658 102.208 37.375 103.571 37.375C104.933 37.375 106.037 38.4658 106.037 39.8125C106.037 41.1592 104.933 42.25 103.571 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 55.25C102.208 55.25 101.105 54.1592 101.105 52.8125C101.105 51.4658 102.208 50.375 103.571 50.375C104.933 50.375 106.037 51.4658 106.037 52.8125C106.037 54.1592 104.933 55.25 103.571 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 67.4375C102.208 67.4375 101.105 66.3467 101.105 65C101.105 63.6533 102.208 62.5625 103.571 62.5625C104.933 62.5625 106.037 63.6533 106.037 65C106.037 66.3467 104.933 67.4375 103.571 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 80.4375C102.208 80.4375 101.105 79.3467 101.105 78C101.105 76.6533 102.208 75.5625 103.571 75.5625C104.933 75.5625 106.037 76.6533 106.037 78C106.037 79.3467 104.933 80.4375 103.571 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 92.625C102.208 92.625 101.105 91.5342 101.105 90.1875C101.105 88.8408 102.208 87.75 103.571 87.75C104.933 87.75 106.037 88.8408 106.037 90.1875C106.037 91.5342 104.933 92.625 103.571 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 105.625C102.208 105.625 101.105 104.534 101.105 103.188C101.105 101.841 102.208 100.75 103.571 100.75C104.933 100.75 106.037 101.841 106.037 103.188C106.037 104.534 104.933 105.625 103.571 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 117.812C102.208 117.812 101.105 116.722 101.105 115.375C101.105 114.028 102.208 112.938 103.571 112.938C104.933 112.938 106.037 114.028 106.037 115.375C106.037 116.722 104.933 117.812 103.571 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 130C102.208 130 101.105 128.909 101.105 127.562C101.105 126.216 102.208 125.125 103.571 125.125C104.933 125.125 106.037 126.216 106.037 127.562C106.037 128.909 104.933 130 103.571 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 143C102.208 143 101.105 141.909 101.105 140.562C101.105 139.216 102.208 138.125 103.571 138.125C104.933 138.125 106.037 139.216 106.037 140.562C106.037 141.909 104.933 143 103.571 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 4.875C89.8786 4.875 88.7751 3.78422 88.7751 2.4375C88.7751 1.09078 89.8786 0 91.2411 0C92.6035 0 93.707 1.09078 93.707 2.4375C93.707 3.78422 92.6035 4.875 91.2411 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 17.875C89.8786 17.875 88.7751 16.7842 88.7751 15.4375C88.7751 14.0908 89.8786 13 91.2411 13C92.6035 13 93.707 14.0908 93.707 15.4375C93.707 16.7842 92.6035 17.875 91.2411 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 30.0625C89.8786 30.0625 88.7751 28.9717 88.7751 27.625C88.7751 26.2783 89.8786 25.1875 91.2411 25.1875C92.6035 25.1875 93.707 26.2783 93.707 27.625C93.707 28.9717 92.6035 30.0625 91.2411 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 42.25C89.8786 42.25 88.7751 41.1592 88.7751 39.8125C88.7751 38.4658 89.8786 37.375 91.2411 37.375C92.6035 37.375 93.707 38.4658 93.707 39.8125C93.707 41.1592 92.6035 42.25 91.2411 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 55.25C89.8786 55.25 88.7751 54.1592 88.7751 52.8125C88.7751 51.4658 89.8786 50.375 91.2411 50.375C92.6035 50.375 93.707 51.4658 93.707 52.8125C93.707 54.1592 92.6035 55.25 91.2411 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 67.4375C89.8786 67.4375 88.7751 66.3467 88.7751 65C88.7751 63.6533 89.8786 62.5625 91.2411 62.5625C92.6035 62.5625 93.707 63.6533 93.707 65C93.707 66.3467 92.6035 67.4375 91.2411 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 80.4375C89.8786 80.4375 88.7751 79.3467 88.7751 78C88.7751 76.6533 89.8786 75.5625 91.2411 75.5625C92.6035 75.5625 93.707 76.6533 93.707 78C93.707 79.3467 92.6035 80.4375 91.2411 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 92.625C89.8786 92.625 88.7751 91.5342 88.7751 90.1875C88.7751 88.8408 89.8786 87.75 91.2411 87.75C92.6035 87.75 93.707 88.8408 93.707 90.1875C93.707 91.5342 92.6035 92.625 91.2411 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 105.625C89.8786 105.625 88.7751 104.534 88.7751 103.188C88.7751 101.841 89.8786 100.75 91.2411 100.75C92.6035 100.75 93.707 101.841 93.707 103.188C93.707 104.534 92.6035 105.625 91.2411 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 117.812C89.8786 117.812 88.7751 116.722 88.7751 115.375C88.7751 114.028 89.8786 112.938 91.2411 112.938C92.6035 112.938 93.707 114.028 93.707 115.375C93.707 116.722 92.6035 117.812 91.2411 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 130C89.8786 130 88.7751 128.909 88.7751 127.562C88.7751 126.216 89.8786 125.125 91.2411 125.125C92.6035 125.125 93.707 126.216 93.707 127.562C93.707 128.909 92.6035 130 91.2411 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 143C89.8786 143 88.7751 141.909 88.7751 140.562C88.7751 139.216 89.8786 138.125 91.2411 138.125C92.6035 138.125 93.707 139.216 93.707 140.562C93.707 141.909 92.6035 143 91.2411 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 4.875C76.7268 4.875 75.6232 3.78422 75.6232 2.4375C75.6232 1.09078 76.7268 0 78.0892 0C79.4517 0 80.5552 1.09078 80.5552 2.4375C80.5552 3.78422 79.4517 4.875 78.0892 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 17.875C76.7268 17.875 75.6232 16.7842 75.6232 15.4375C75.6232 14.0908 76.7268 13 78.0892 13C79.4517 13 80.5552 14.0908 80.5552 15.4375C80.5552 16.7842 79.4517 17.875 78.0892 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 30.0625C76.7268 30.0625 75.6232 28.9717 75.6232 27.625C75.6232 26.2783 76.7268 25.1875 78.0892 25.1875C79.4517 25.1875 80.5552 26.2783 80.5552 27.625C80.5552 28.9717 79.4517 30.0625 78.0892 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 42.25C76.7268 42.25 75.6232 41.1592 75.6232 39.8125C75.6232 38.4658 76.7268 37.375 78.0892 37.375C79.4517 37.375 80.5552 38.4658 80.5552 39.8125C80.5552 41.1592 79.4517 42.25 78.0892 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 55.25C76.7268 55.25 75.6232 54.1592 75.6232 52.8125C75.6232 51.4658 76.7268 50.375 78.0892 50.375C79.4517 50.375 80.5552 51.4658 80.5552 52.8125C80.5552 54.1592 79.4517 55.25 78.0892 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 67.4375C76.7268 67.4375 75.6232 66.3467 75.6232 65C75.6232 63.6533 76.7268 62.5625 78.0892 62.5625C79.4517 62.5625 80.5552 63.6533 80.5552 65C80.5552 66.3467 79.4517 67.4375 78.0892 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 80.4375C76.7268 80.4375 75.6232 79.3467 75.6232 78C75.6232 76.6533 76.7268 75.5625 78.0892 75.5625C79.4517 75.5625 80.5552 76.6533 80.5552 78C80.5552 79.3467 79.4517 80.4375 78.0892 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 92.625C76.7268 92.625 75.6232 91.5342 75.6232 90.1875C75.6232 88.8408 76.7268 87.75 78.0892 87.75C79.4517 87.75 80.5552 88.8408 80.5552 90.1875C80.5552 91.5342 79.4517 92.625 78.0892 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 105.625C76.7268 105.625 75.6232 104.534 75.6232 103.188C75.6232 101.841 76.7268 100.75 78.0892 100.75C79.4517 100.75 80.5552 101.841 80.5552 103.188C80.5552 104.534 79.4517 105.625 78.0892 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 117.812C76.7268 117.812 75.6232 116.722 75.6232 115.375C75.6232 114.028 76.7268 112.938 78.0892 112.938C79.4517 112.938 80.5552 114.028 80.5552 115.375C80.5552 116.722 79.4517 117.812 78.0892 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 130C76.7268 130 75.6232 128.909 75.6232 127.562C75.6232 126.216 76.7268 125.125 78.0892 125.125C79.4517 125.125 80.5552 126.216 80.5552 127.562C80.5552 128.909 79.4517 130 78.0892 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 143C76.7268 143 75.6232 141.909 75.6232 140.562C75.6232 139.216 76.7268 138.125 78.0892 138.125C79.4517 138.125 80.5552 139.216 80.5552 140.562C80.5552 141.909 79.4517 143 78.0892 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 4.875C64.3967 4.875 63.2932 3.78422 63.2932 2.4375C63.2932 1.09078 64.3967 0 65.7591 0C67.1216 0 68.2251 1.09078 68.2251 2.4375C68.2251 3.78422 67.1216 4.875 65.7591 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 17.875C64.3967 17.875 63.2932 16.7842 63.2932 15.4375C63.2932 14.0908 64.3967 13 65.7591 13C67.1216 13 68.2251 14.0908 68.2251 15.4375C68.2251 16.7842 67.1216 17.875 65.7591 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 30.0625C64.3967 30.0625 63.2932 28.9717 63.2932 27.625C63.2932 26.2783 64.3967 25.1875 65.7591 25.1875C67.1216 25.1875 68.2251 26.2783 68.2251 27.625C68.2251 28.9717 67.1216 30.0625 65.7591 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 42.25C64.3967 42.25 63.2932 41.1592 63.2932 39.8125C63.2932 38.4658 64.3967 37.375 65.7591 37.375C67.1216 37.375 68.2251 38.4658 68.2251 39.8125C68.2251 41.1592 67.1216 42.25 65.7591 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 55.25C64.3967 55.25 63.2932 54.1592 63.2932 52.8125C63.2932 51.4658 64.3967 50.375 65.7591 50.375C67.1216 50.375 68.2251 51.4658 68.2251 52.8125C68.2251 54.1592 67.1216 55.25 65.7591 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 67.4375C64.3967 67.4375 63.2932 66.3467 63.2932 65C63.2932 63.6533 64.3967 62.5625 65.7591 62.5625C67.1216 62.5625 68.2251 63.6533 68.2251 65C68.2251 66.3467 67.1216 67.4375 65.7591 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 80.4375C64.3967 80.4375 63.2932 79.3467 63.2932 78C63.2932 76.6533 64.3967 75.5625 65.7591 75.5625C67.1216 75.5625 68.2251 76.6533 68.2251 78C68.2251 79.3467 67.1216 80.4375 65.7591 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 92.625C64.3967 92.625 63.2932 91.5342 63.2932 90.1875C63.2932 88.8408 64.3967 87.75 65.7591 87.75C67.1216 87.75 68.2251 88.8408 68.2251 90.1875C68.2251 91.5342 67.1216 92.625 65.7591 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 105.625C64.3967 105.625 63.2932 104.534 63.2932 103.188C63.2932 101.841 64.3967 100.75 65.7591 100.75C67.1216 100.75 68.2251 101.841 68.2251 103.188C68.2251 104.534 67.1216 105.625 65.7591 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 117.812C64.3967 117.812 63.2932 116.722 63.2932 115.375C63.2932 114.028 64.3967 112.938 65.7591 112.938C67.1216 112.938 68.2251 114.028 68.2251 115.375C68.2251 116.722 67.1216 117.812 65.7591 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 130C64.3967 130 63.2932 128.909 63.2932 127.562C63.2932 126.216 64.3967 125.125 65.7591 125.125C67.1216 125.125 68.2251 126.216 68.2251 127.562C68.2251 128.909 67.1216 130 65.7591 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 143C64.3967 143 63.2932 141.909 63.2932 140.562C63.2932 139.216 64.3967 138.125 65.7591 138.125C67.1216 138.125 68.2251 139.216 68.2251 140.562C68.2251 141.909 67.1216 143 65.7591 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 4.875C52.0671 4.875 50.9636 3.78422 50.9636 2.4375C50.9636 1.09078 52.0671 0 53.4295 0C54.792 0 55.8955 1.09078 55.8955 2.4375C55.8955 3.78422 54.792 4.875 53.4295 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 17.875C52.0671 17.875 50.9636 16.7842 50.9636 15.4375C50.9636 14.0908 52.0671 13 53.4295 13C54.792 13 55.8955 14.0908 55.8955 15.4375C55.8955 16.7842 54.792 17.875 53.4295 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 30.0625C52.0671 30.0625 50.9636 28.9717 50.9636 27.625C50.9636 26.2783 52.0671 25.1875 53.4295 25.1875C54.792 25.1875 55.8955 26.2783 55.8955 27.625C55.8955 28.9717 54.792 30.0625 53.4295 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 42.25C52.0671 42.25 50.9636 41.1592 50.9636 39.8125C50.9636 38.4658 52.0671 37.375 53.4295 37.375C54.792 37.375 55.8955 38.4658 55.8955 39.8125C55.8955 41.1592 54.792 42.25 53.4295 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 55.25C52.0671 55.25 50.9636 54.1592 50.9636 52.8125C50.9636 51.4658 52.0671 50.375 53.4295 50.375C54.792 50.375 55.8955 51.4658 55.8955 52.8125C55.8955 54.1592 54.792 55.25 53.4295 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 67.4375C52.0671 67.4375 50.9636 66.3467 50.9636 65C50.9636 63.6533 52.0671 62.5625 53.4295 62.5625C54.792 62.5625 55.8955 63.6533 55.8955 65C55.8955 66.3467 54.792 67.4375 53.4295 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 80.4375C52.0671 80.4375 50.9636 79.3467 50.9636 78C50.9636 76.6533 52.0671 75.5625 53.4295 75.5625C54.792 75.5625 55.8955 76.6533 55.8955 78C55.8955 79.3467 54.792 80.4375 53.4295 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 92.625C52.0671 92.625 50.9636 91.5342 50.9636 90.1875C50.9636 88.8408 52.0671 87.75 53.4295 87.75C54.792 87.75 55.8955 88.8408 55.8955 90.1875C55.8955 91.5342 54.792 92.625 53.4295 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 105.625C52.0671 105.625 50.9636 104.534 50.9636 103.188C50.9636 101.841 52.0671 100.75 53.4295 100.75C54.792 100.75 55.8955 101.841 55.8955 103.188C55.8955 104.534 54.792 105.625 53.4295 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 117.812C52.0671 117.812 50.9636 116.722 50.9636 115.375C50.9636 114.028 52.0671 112.938 53.4295 112.938C54.792 112.938 55.8955 114.028 55.8955 115.375C55.8955 116.722 54.792 117.812 53.4295 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 130C52.0671 130 50.9636 128.909 50.9636 127.562C50.9636 126.216 52.0671 125.125 53.4295 125.125C54.792 125.125 55.8955 126.216 55.8955 127.562C55.8955 128.909 54.792 130 53.4295 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 143C52.0671 143 50.9636 141.909 50.9636 140.562C50.9636 139.216 52.0671 138.125 53.4295 138.125C54.792 138.125 55.8955 139.216 55.8955 140.562C55.8955 141.909 54.792 143 53.4295 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 4.875C38.9152 4.875 37.8117 3.78422 37.8117 2.4375C37.8117 1.09078 38.9152 0 40.2777 0C41.6401 0 42.7437 1.09078 42.7437 2.4375C42.7437 3.78422 41.6401 4.875 40.2777 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 17.875C38.9152 17.875 37.8117 16.7842 37.8117 15.4375C37.8117 14.0908 38.9152 13 40.2777 13C41.6401 13 42.7437 14.0908 42.7437 15.4375C42.7437 16.7842 41.6401 17.875 40.2777 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 30.0625C38.9152 30.0625 37.8117 28.9717 37.8117 27.625C37.8117 26.2783 38.9152 25.1875 40.2777 25.1875C41.6401 25.1875 42.7437 26.2783 42.7437 27.625C42.7437 28.9717 41.6401 30.0625 40.2777 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 42.25C38.9152 42.25 37.8117 41.1592 37.8117 39.8125C37.8117 38.4658 38.9152 37.375 40.2777 37.375C41.6401 37.375 42.7437 38.4658 42.7437 39.8125C42.7437 41.1592 41.6401 42.25 40.2777 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 55.25C38.9152 55.25 37.8117 54.1592 37.8117 52.8125C37.8117 51.4658 38.9152 50.375 40.2777 50.375C41.6401 50.375 42.7437 51.4658 42.7437 52.8125C42.7437 54.1592 41.6401 55.25 40.2777 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 67.4375C38.9152 67.4375 37.8117 66.3467 37.8117 65C37.8117 63.6533 38.9152 62.5625 40.2777 62.5625C41.6401 62.5625 42.7437 63.6533 42.7437 65C42.7437 66.3467 41.6401 67.4375 40.2777 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 80.4375C38.9152 80.4375 37.8117 79.3467 37.8117 78C37.8117 76.6533 38.9152 75.5625 40.2777 75.5625C41.6401 75.5625 42.7437 76.6533 42.7437 78C42.7437 79.3467 41.6401 80.4375 40.2777 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 92.625C38.9152 92.625 37.8117 91.5342 37.8117 90.1875C37.8117 88.8408 38.9152 87.75 40.2777 87.75C41.6401 87.75 42.7437 88.8408 42.7437 90.1875C42.7437 91.5342 41.6401 92.625 40.2777 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 105.625C38.9152 105.625 37.8117 104.534 37.8117 103.188C37.8117 101.841 38.9152 100.75 40.2777 100.75C41.6401 100.75 42.7437 101.841 42.7437 103.188C42.7437 104.534 41.6401 105.625 40.2777 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 117.812C38.9152 117.812 37.8117 116.722 37.8117 115.375C37.8117 114.028 38.9152 112.938 40.2777 112.938C41.6401 112.938 42.7437 114.028 42.7437 115.375C42.7437 116.722 41.6401 117.812 40.2777 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 130C38.9152 130 37.8117 128.909 37.8117 127.562C37.8117 126.216 38.9152 125.125 40.2777 125.125C41.6401 125.125 42.7437 126.216 42.7437 127.562C42.7437 128.909 41.6401 130 40.2777 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 143C38.9152 143 37.8117 141.909 37.8117 140.562C37.8117 139.216 38.9152 138.125 40.2777 138.125C41.6401 138.125 42.7437 139.216 42.7437 140.562C42.7437 141.909 41.6401 143 40.2777 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 4.875C26.5852 4.875 25.4816 3.78422 25.4816 2.4375C25.4816 1.09078 26.5852 0 27.9476 0C29.3101 0 30.4136 1.09078 30.4136 2.4375C30.4136 3.78422 29.3101 4.875 27.9476 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 17.875C26.5852 17.875 25.4816 16.7842 25.4816 15.4375C25.4816 14.0908 26.5852 13 27.9476 13C29.3101 13 30.4136 14.0908 30.4136 15.4375C30.4136 16.7842 29.3101 17.875 27.9476 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 30.0625C26.5852 30.0625 25.4816 28.9717 25.4816 27.625C25.4816 26.2783 26.5852 25.1875 27.9476 25.1875C29.3101 25.1875 30.4136 26.2783 30.4136 27.625C30.4136 28.9717 29.3101 30.0625 27.9476 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 42.25C26.5852 42.25 25.4816 41.1592 25.4816 39.8125C25.4816 38.4658 26.5852 37.375 27.9476 37.375C29.3101 37.375 30.4136 38.4658 30.4136 39.8125C30.4136 41.1592 29.3101 42.25 27.9476 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 55.25C26.5852 55.25 25.4816 54.1592 25.4816 52.8125C25.4816 51.4658 26.5852 50.375 27.9476 50.375C29.3101 50.375 30.4136 51.4658 30.4136 52.8125C30.4136 54.1592 29.3101 55.25 27.9476 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 67.4375C26.5852 67.4375 25.4816 66.3467 25.4816 65C25.4816 63.6533 26.5852 62.5625 27.9476 62.5625C29.3101 62.5625 30.4136 63.6533 30.4136 65C30.4136 66.3467 29.3101 67.4375 27.9476 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 80.4375C26.5852 80.4375 25.4816 79.3467 25.4816 78C25.4816 76.6533 26.5852 75.5625 27.9476 75.5625C29.3101 75.5625 30.4136 76.6533 30.4136 78C30.4136 79.3467 29.3101 80.4375 27.9476 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 92.625C26.5852 92.625 25.4816 91.5342 25.4816 90.1875C25.4816 88.8408 26.5852 87.75 27.9476 87.75C29.3101 87.75 30.4136 88.8408 30.4136 90.1875C30.4136 91.5342 29.3101 92.625 27.9476 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 105.625C26.5852 105.625 25.4816 104.534 25.4816 103.188C25.4816 101.841 26.5852 100.75 27.9476 100.75C29.3101 100.75 30.4136 101.841 30.4136 103.188C30.4136 104.534 29.3101 105.625 27.9476 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 117.812C26.5852 117.812 25.4816 116.722 25.4816 115.375C25.4816 114.028 26.5852 112.938 27.9476 112.938C29.3101 112.938 30.4136 114.028 30.4136 115.375C30.4136 116.722 29.3101 117.812 27.9476 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 130C26.5852 130 25.4816 128.909 25.4816 127.562C25.4816 126.216 26.5852 125.125 27.9476 125.125C29.3101 125.125 30.4136 126.216 30.4136 127.562C30.4136 128.909 29.3101 130 27.9476 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 143C26.5852 143 25.4816 141.909 25.4816 140.562C25.4816 139.216 26.5852 138.125 27.9476 138.125C29.3101 138.125 30.4136 139.216 30.4136 140.562C30.4136 141.909 29.3101 143 27.9476 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 4.875C13.4333 4.875 12.3298 3.78422 12.3298 2.4375C12.3298 1.09078 13.4333 0 14.7958 0C16.1582 0 17.2617 1.09078 17.2617 2.4375C17.2617 3.78422 16.1582 4.875 14.7958 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 17.875C13.4333 17.875 12.3298 16.7842 12.3298 15.4375C12.3298 14.0908 13.4333 13 14.7958 13C16.1582 13 17.2617 14.0908 17.2617 15.4375C17.2617 16.7842 16.1582 17.875 14.7958 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 30.0625C13.4333 30.0625 12.3298 28.9717 12.3298 27.625C12.3298 26.2783 13.4333 25.1875 14.7958 25.1875C16.1582 25.1875 17.2617 26.2783 17.2617 27.625C17.2617 28.9717 16.1582 30.0625 14.7958 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 42.25C13.4333 42.25 12.3298 41.1592 12.3298 39.8125C12.3298 38.4658 13.4333 37.375 14.7958 37.375C16.1582 37.375 17.2617 38.4658 17.2617 39.8125C17.2617 41.1592 16.1582 42.25 14.7958 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 55.25C13.4333 55.25 12.3298 54.1592 12.3298 52.8125C12.3298 51.4658 13.4333 50.375 14.7958 50.375C16.1582 50.375 17.2617 51.4658 17.2617 52.8125C17.2617 54.1592 16.1582 55.25 14.7958 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 67.4375C13.4333 67.4375 12.3298 66.3467 12.3298 65C12.3298 63.6533 13.4333 62.5625 14.7958 62.5625C16.1582 62.5625 17.2617 63.6533 17.2617 65C17.2617 66.3467 16.1582 67.4375 14.7958 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 80.4375C13.4333 80.4375 12.3298 79.3467 12.3298 78C12.3298 76.6533 13.4333 75.5625 14.7958 75.5625C16.1582 75.5625 17.2617 76.6533 17.2617 78C17.2617 79.3467 16.1582 80.4375 14.7958 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 92.625C13.4333 92.625 12.3298 91.5342 12.3298 90.1875C12.3298 88.8408 13.4333 87.75 14.7958 87.75C16.1582 87.75 17.2617 88.8408 17.2617 90.1875C17.2617 91.5342 16.1582 92.625 14.7958 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 105.625C13.4333 105.625 12.3298 104.534 12.3298 103.188C12.3298 101.841 13.4333 100.75 14.7958 100.75C16.1582 100.75 17.2617 101.841 17.2617 103.188C17.2617 104.534 16.1582 105.625 14.7958 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 117.812C13.4333 117.812 12.3298 116.722 12.3298 115.375C12.3298 114.028 13.4333 112.938 14.7958 112.938C16.1582 112.938 17.2617 114.028 17.2617 115.375C17.2617 116.722 16.1582 117.812 14.7958 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 130C13.4333 130 12.3298 128.909 12.3298 127.562C12.3298 126.216 13.4333 125.125 14.7958 125.125C16.1582 125.125 17.2617 126.216 17.2617 127.562C17.2617 128.909 16.1582 130 14.7958 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 143C13.4333 143 12.3298 141.909 12.3298 140.562C12.3298 139.216 13.4333 138.125 14.7958 138.125C16.1582 138.125 17.2617 139.216 17.2617 140.562C17.2617 141.909 16.1582 143 14.7958 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 4.875C1.10371 4.875 0.000191689 3.78422 0.000191689 2.4375C0.000191689 1.09078 1.10371 0 2.46616 0C3.82861 0 4.93213 1.09078 4.93213 2.4375C4.93213 3.78422 3.82861 4.875 2.46616 4.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 17.875C1.10371 17.875 0.000191689 16.7842 0.000191689 15.4375C0.000191689 14.0908 1.10371 13 2.46616 13C3.82861 13 4.93213 14.0908 4.93213 15.4375C4.93213 16.7842 3.82861 17.875 2.46616 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 30.0625C1.10371 30.0625 0.000191689 28.9717 0.000191689 27.625C0.000191689 26.2783 1.10371 25.1875 2.46616 25.1875C3.82861 25.1875 4.93213 26.2783 4.93213 27.625C4.93213 28.9717 3.82861 30.0625 2.46616 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 42.25C1.10371 42.25 0.000191689 41.1592 0.000191689 39.8125C0.000191689 38.4658 1.10371 37.375 2.46616 37.375C3.82861 37.375 4.93213 38.4658 4.93213 39.8125C4.93213 41.1592 3.82861 42.25 2.46616 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 55.25C1.10371 55.25 0.000191689 54.1592 0.000191689 52.8125C0.000191689 51.4658 1.10371 50.375 2.46616 50.375C3.82861 50.375 4.93213 51.4658 4.93213 52.8125C4.93213 54.1592 3.82861 55.25 2.46616 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 67.4375C1.10371 67.4375 0.000191689 66.3467 0.000191689 65C0.000191689 63.6533 1.10371 62.5625 2.46616 62.5625C3.82861 62.5625 4.93213 63.6533 4.93213 65C4.93213 66.3467 3.82861 67.4375 2.46616 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 80.4375C1.10371 80.4375 0.000191689 79.3467 0.000191689 78C0.000191689 76.6533 1.10371 75.5625 2.46616 75.5625C3.82861 75.5625 4.93213 76.6533 4.93213 78C4.93213 79.3467 3.82861 80.4375 2.46616 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 92.625C1.10371 92.625 0.000191689 91.5342 0.000191689 90.1875C0.000191689 88.8408 1.10371 87.75 2.46616 87.75C3.82861 87.75 4.93213 88.8408 4.93213 90.1875C4.93213 91.5342 3.82861 92.625 2.46616 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 105.625C1.10371 105.625 0.000191689 104.534 0.000191689 103.188C0.000191689 101.841 1.10371 100.75 2.46616 100.75C3.82861 100.75 4.93213 101.841 4.93213 103.188C4.93213 104.534 3.82861 105.625 2.46616 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 117.812C1.10371 117.812 0.000191689 116.722 0.000191689 115.375C0.000191689 114.028 1.10371 112.938 2.46616 112.938C3.82861 112.938 4.93213 114.028 4.93213 115.375C4.93213 116.722 3.82861 117.812 2.46616 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 130C1.10371 130 0.000191689 128.909 0.000191689 127.562C0.000191689 126.216 1.10371 125.125 2.46616 125.125C3.82861 125.125 4.93213 126.216 4.93213 127.562C4.93213 128.909 3.82861 130 2.46616 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 143C1.10371 143 0.000191689 141.909 0.000191689 140.562C0.000191689 139.216 1.10371 138.125 2.46616 138.125C3.82861 138.125 4.93213 139.216 4.93213 140.562C4.93213 141.909 3.82861 143 2.46616 143Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 17.875C153.172 17.875 152.068 16.7842 152.068 15.4375C152.068 14.0908 153.172 13 154.534 13C155.896 13 157 14.0908 157 15.4375C157 16.7842 155.896 17.875 154.534 17.875Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 30.0625C153.172 30.0625 152.068 28.9717 152.068 27.625C152.068 26.2783 153.172 25.1875 154.534 25.1875C155.896 25.1875 157 26.2783 157 27.625C157 28.9717 155.896 30.0625 154.534 30.0625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 42.25C153.172 42.25 152.068 41.1592 152.068 39.8125C152.068 38.4658 153.172 37.375 154.534 37.375C155.896 37.375 157 38.4658 157 39.8125C157 41.1592 155.896 42.25 154.534 42.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 55.25C153.172 55.25 152.068 54.1592 152.068 52.8125C152.068 51.4658 153.172 50.375 154.534 50.375C155.896 50.375 157 51.4658 157 52.8125C157 54.1592 155.896 55.25 154.534 55.25Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 67.4375C153.172 67.4375 152.068 66.3467 152.068 65C152.068 63.6533 153.172 62.5625 154.534 62.5625C155.896 62.5625 157 63.6533 157 65C157 66.3467 155.896 67.4375 154.534 67.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 80.4375C153.172 80.4375 152.068 79.3467 152.068 78C152.068 76.6533 153.172 75.5625 154.534 75.5625C155.896 75.5625 157 76.6533 157 78C157 79.3467 155.896 80.4375 154.534 80.4375Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 92.625C153.172 92.625 152.068 91.5342 152.068 90.1875C152.068 88.8408 153.172 87.75 154.534 87.75C155.896 87.75 157 88.8408 157 90.1875C157 91.5342 155.896 92.625 154.534 92.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 105.625C153.172 105.625 152.068 104.534 152.068 103.188C152.068 101.841 153.172 100.75 154.534 100.75C155.896 100.75 157 101.841 157 103.188C157 104.534 155.896 105.625 154.534 105.625Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 117.812C153.172 117.812 152.068 116.722 152.068 115.375C152.068 114.028 153.172 112.938 154.534 112.938C155.896 112.938 157 114.028 157 115.375C157 116.722 155.896 117.812 154.534 117.812Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 130C153.172 130 152.068 128.909 152.068 127.562C152.068 126.216 153.172 125.125 154.534 125.125C155.896 125.125 157 126.216 157 127.562C157 128.909 155.896 130 154.534 130Z" fill="#DBE4EE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 143C153.172 143 152.068 141.909 152.068 140.562C152.068 139.216 153.172 138.125 154.534 138.125C155.896 138.125 157 139.216 157 140.562C157 141.909 155.896 143 154.534 143Z" fill="#DBE4EE" />
                                </svg>

                            </div>
                            <div className={styles.v4InnerReviews}>

                                <div className={styles.v4Reviews}>
                                    <div className={styles.reviewerDet}>
                                        <div className={styles.reviewImage}><img src={reviewimage2} /></div>
                                        <div className={styles.reviewName}>
                                            <h5>
                                                Mark Victor Hansen
                                        </h5>
                                            <p>
                                            Co-Creator of Chicken Soup Series, 59x NY Times #1 Bestselling Author, 2x Guinness Record Holder, 500 Million Books Sold
                                        </p>
                                        </div>
                                    </div>
                                    <div className={styles.reviewText}>
                                        <p>Sharing goals with friends is one of life’s greatest keys to success. If you have unrealized dreams and goals, then take a leap of faith and share them with the world. This little known trick will help you manifest and materialize your desires. GoalMogul has brilliantly laid out a path that will nurture your mind for success. Follow it and watch your dreams unfold and your relationships blossom.
                                    </p>
                                        {this.starSvg(5)}

                                    </div>
                                </div>
                                <div className={styles.v4Reviews}>
                                    <div className={styles.reviewerDet}>
                                        <div className={styles.reviewImage}><img src={reviewimage3} /></div>
                                        <div className={styles.reviewName}>
                                            <h5>
                                                John Assaraf                                        </h5>
                                            <p>
                                                Leading Brain & Achievement Expert, Thought-Leader on The Ellen Degeneres Show, Anderson Cooper, and Larry King Live, 2x Billion Dollar Business Exits                                        </p>
                                        </div>
                                    </div>
                                    <div className={styles.reviewText}>
                                        <p>Ride-sharing and home-sharing revolutionized the world by making traveling easier. With GoalMogul, goal-sharing and helping each other will make your life easier. The possibilities are endless.
                                    </p>
                                        {this.starSvg(5)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mobileMainReview}>
                        <div className={styles.hidePcDotPttern}>
                            <svg width="157" height="143" viewBox="0 0 157 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 4.875C153.172 4.875 152.068 3.78422 152.068 2.4375C152.068 1.09078 153.172 0 154.534 0C155.896 0 157 1.09078 157 2.4375C157 3.78422 155.896 4.875 154.534 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 4.875C140.842 4.875 139.738 3.78422 139.738 2.4375C139.738 1.09078 140.842 0 142.204 0C143.566 0 144.67 1.09078 144.67 2.4375C144.67 3.78422 143.566 4.875 142.204 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 17.875C140.842 17.875 139.738 16.7842 139.738 15.4375C139.738 14.0908 140.842 13 142.204 13C143.566 13 144.67 14.0908 144.67 15.4375C144.67 16.7842 143.566 17.875 142.204 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 30.0625C140.842 30.0625 139.738 28.9717 139.738 27.625C139.738 26.2783 140.842 25.1875 142.204 25.1875C143.566 25.1875 144.67 26.2783 144.67 27.625C144.67 28.9717 143.566 30.0625 142.204 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 42.25C140.842 42.25 139.738 41.1592 139.738 39.8125C139.738 38.4658 140.842 37.375 142.204 37.375C143.566 37.375 144.67 38.4658 144.67 39.8125C144.67 41.1592 143.566 42.25 142.204 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 55.25C140.842 55.25 139.738 54.1592 139.738 52.8125C139.738 51.4658 140.842 50.375 142.204 50.375C143.566 50.375 144.67 51.4658 144.67 52.8125C144.67 54.1592 143.566 55.25 142.204 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 67.4375C140.842 67.4375 139.738 66.3467 139.738 65C139.738 63.6533 140.842 62.5625 142.204 62.5625C143.566 62.5625 144.67 63.6533 144.67 65C144.67 66.3467 143.566 67.4375 142.204 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 80.4375C140.842 80.4375 139.738 79.3467 139.738 78C139.738 76.6533 140.842 75.5625 142.204 75.5625C143.566 75.5625 144.67 76.6533 144.67 78C144.67 79.3467 143.566 80.4375 142.204 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 92.625C140.842 92.625 139.738 91.5342 139.738 90.1875C139.738 88.8408 140.842 87.75 142.204 87.75C143.566 87.75 144.67 88.8408 144.67 90.1875C144.67 91.5342 143.566 92.625 142.204 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 105.625C140.842 105.625 139.738 104.534 139.738 103.188C139.738 101.841 140.842 100.75 142.204 100.75C143.566 100.75 144.67 101.841 144.67 103.188C144.67 104.534 143.566 105.625 142.204 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 117.812C140.842 117.812 139.738 116.722 139.738 115.375C139.738 114.028 140.842 112.938 142.204 112.938C143.566 112.938 144.67 114.028 144.67 115.375C144.67 116.722 143.566 117.812 142.204 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 130C140.842 130 139.738 128.909 139.738 127.562C139.738 126.216 140.842 125.125 142.204 125.125C143.566 125.125 144.67 126.216 144.67 127.562C144.67 128.909 143.566 130 142.204 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.204 143C140.842 143 139.738 141.909 139.738 140.562C139.738 139.216 140.842 138.125 142.204 138.125C143.566 138.125 144.67 139.216 144.67 140.562C144.67 141.909 143.566 143 142.204 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 4.875C127.69 4.875 126.587 3.78422 126.587 2.4375C126.587 1.09078 127.69 0 129.053 0C130.415 0 131.519 1.09078 131.519 2.4375C131.519 3.78422 130.415 4.875 129.053 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 17.875C127.69 17.875 126.587 16.7842 126.587 15.4375C126.587 14.0908 127.69 13 129.053 13C130.415 13 131.519 14.0908 131.519 15.4375C131.519 16.7842 130.415 17.875 129.053 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 30.0625C127.69 30.0625 126.587 28.9717 126.587 27.625C126.587 26.2783 127.69 25.1875 129.053 25.1875C130.415 25.1875 131.519 26.2783 131.519 27.625C131.519 28.9717 130.415 30.0625 129.053 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 42.25C127.69 42.25 126.587 41.1592 126.587 39.8125C126.587 38.4658 127.69 37.375 129.053 37.375C130.415 37.375 131.519 38.4658 131.519 39.8125C131.519 41.1592 130.415 42.25 129.053 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 55.25C127.69 55.25 126.587 54.1592 126.587 52.8125C126.587 51.4658 127.69 50.375 129.053 50.375C130.415 50.375 131.519 51.4658 131.519 52.8125C131.519 54.1592 130.415 55.25 129.053 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 67.4375C127.69 67.4375 126.587 66.3467 126.587 65C126.587 63.6533 127.69 62.5625 129.053 62.5625C130.415 62.5625 131.519 63.6533 131.519 65C131.519 66.3467 130.415 67.4375 129.053 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 80.4375C127.69 80.4375 126.587 79.3467 126.587 78C126.587 76.6533 127.69 75.5625 129.053 75.5625C130.415 75.5625 131.519 76.6533 131.519 78C131.519 79.3467 130.415 80.4375 129.053 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 92.625C127.69 92.625 126.587 91.5342 126.587 90.1875C126.587 88.8408 127.69 87.75 129.053 87.75C130.415 87.75 131.519 88.8408 131.519 90.1875C131.519 91.5342 130.415 92.625 129.053 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 105.625C127.69 105.625 126.587 104.534 126.587 103.188C126.587 101.841 127.69 100.75 129.053 100.75C130.415 100.75 131.519 101.841 131.519 103.188C131.519 104.534 130.415 105.625 129.053 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 117.812C127.69 117.812 126.587 116.722 126.587 115.375C126.587 114.028 127.69 112.938 129.053 112.938C130.415 112.938 131.519 114.028 131.519 115.375C131.519 116.722 130.415 117.812 129.053 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 130C127.69 130 126.587 128.909 126.587 127.562C126.587 126.216 127.69 125.125 129.053 125.125C130.415 125.125 131.519 126.216 131.519 127.562C131.519 128.909 130.415 130 129.053 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.053 143C127.69 143 126.587 141.909 126.587 140.562C126.587 139.216 127.69 138.125 129.053 138.125C130.415 138.125 131.519 139.216 131.519 140.562C131.519 141.909 130.415 143 129.053 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 4.875C115.36 4.875 114.257 3.78422 114.257 2.4375C114.257 1.09078 115.36 0 116.723 0C118.085 0 119.188 1.09078 119.188 2.4375C119.188 3.78422 118.085 4.875 116.723 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 17.875C115.36 17.875 114.257 16.7842 114.257 15.4375C114.257 14.0908 115.36 13 116.723 13C118.085 13 119.188 14.0908 119.188 15.4375C119.188 16.7842 118.085 17.875 116.723 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 30.0625C115.36 30.0625 114.257 28.9717 114.257 27.625C114.257 26.2783 115.36 25.1875 116.723 25.1875C118.085 25.1875 119.188 26.2783 119.188 27.625C119.188 28.9717 118.085 30.0625 116.723 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 42.25C115.36 42.25 114.257 41.1592 114.257 39.8125C114.257 38.4658 115.36 37.375 116.723 37.375C118.085 37.375 119.188 38.4658 119.188 39.8125C119.188 41.1592 118.085 42.25 116.723 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 55.25C115.36 55.25 114.257 54.1592 114.257 52.8125C114.257 51.4658 115.36 50.375 116.723 50.375C118.085 50.375 119.188 51.4658 119.188 52.8125C119.188 54.1592 118.085 55.25 116.723 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 67.4375C115.36 67.4375 114.257 66.3467 114.257 65C114.257 63.6533 115.36 62.5625 116.723 62.5625C118.085 62.5625 119.188 63.6533 119.188 65C119.188 66.3467 118.085 67.4375 116.723 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 80.4375C115.36 80.4375 114.257 79.3467 114.257 78C114.257 76.6533 115.36 75.5625 116.723 75.5625C118.085 75.5625 119.188 76.6533 119.188 78C119.188 79.3467 118.085 80.4375 116.723 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 92.625C115.36 92.625 114.257 91.5342 114.257 90.1875C114.257 88.8408 115.36 87.75 116.723 87.75C118.085 87.75 119.188 88.8408 119.188 90.1875C119.188 91.5342 118.085 92.625 116.723 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 105.625C115.36 105.625 114.257 104.534 114.257 103.188C114.257 101.841 115.36 100.75 116.723 100.75C118.085 100.75 119.188 101.841 119.188 103.188C119.188 104.534 118.085 105.625 116.723 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 117.812C115.36 117.812 114.257 116.722 114.257 115.375C114.257 114.028 115.36 112.938 116.723 112.938C118.085 112.938 119.188 114.028 119.188 115.375C119.188 116.722 118.085 117.812 116.723 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 130C115.36 130 114.257 128.909 114.257 127.562C114.257 126.216 115.36 125.125 116.723 125.125C118.085 125.125 119.188 126.216 119.188 127.562C119.188 128.909 118.085 130 116.723 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.723 143C115.36 143 114.257 141.909 114.257 140.562C114.257 139.216 115.36 138.125 116.723 138.125C118.085 138.125 119.188 139.216 119.188 140.562C119.188 141.909 118.085 143 116.723 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 4.875C102.208 4.875 101.105 3.78422 101.105 2.4375C101.105 1.09078 102.208 0 103.571 0C104.933 0 106.037 1.09078 106.037 2.4375C106.037 3.78422 104.933 4.875 103.571 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 17.875C102.208 17.875 101.105 16.7842 101.105 15.4375C101.105 14.0908 102.208 13 103.571 13C104.933 13 106.037 14.0908 106.037 15.4375C106.037 16.7842 104.933 17.875 103.571 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 30.0625C102.208 30.0625 101.105 28.9717 101.105 27.625C101.105 26.2783 102.208 25.1875 103.571 25.1875C104.933 25.1875 106.037 26.2783 106.037 27.625C106.037 28.9717 104.933 30.0625 103.571 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 42.25C102.208 42.25 101.105 41.1592 101.105 39.8125C101.105 38.4658 102.208 37.375 103.571 37.375C104.933 37.375 106.037 38.4658 106.037 39.8125C106.037 41.1592 104.933 42.25 103.571 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 55.25C102.208 55.25 101.105 54.1592 101.105 52.8125C101.105 51.4658 102.208 50.375 103.571 50.375C104.933 50.375 106.037 51.4658 106.037 52.8125C106.037 54.1592 104.933 55.25 103.571 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 67.4375C102.208 67.4375 101.105 66.3467 101.105 65C101.105 63.6533 102.208 62.5625 103.571 62.5625C104.933 62.5625 106.037 63.6533 106.037 65C106.037 66.3467 104.933 67.4375 103.571 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 80.4375C102.208 80.4375 101.105 79.3467 101.105 78C101.105 76.6533 102.208 75.5625 103.571 75.5625C104.933 75.5625 106.037 76.6533 106.037 78C106.037 79.3467 104.933 80.4375 103.571 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 92.625C102.208 92.625 101.105 91.5342 101.105 90.1875C101.105 88.8408 102.208 87.75 103.571 87.75C104.933 87.75 106.037 88.8408 106.037 90.1875C106.037 91.5342 104.933 92.625 103.571 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 105.625C102.208 105.625 101.105 104.534 101.105 103.188C101.105 101.841 102.208 100.75 103.571 100.75C104.933 100.75 106.037 101.841 106.037 103.188C106.037 104.534 104.933 105.625 103.571 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 117.812C102.208 117.812 101.105 116.722 101.105 115.375C101.105 114.028 102.208 112.938 103.571 112.938C104.933 112.938 106.037 114.028 106.037 115.375C106.037 116.722 104.933 117.812 103.571 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 130C102.208 130 101.105 128.909 101.105 127.562C101.105 126.216 102.208 125.125 103.571 125.125C104.933 125.125 106.037 126.216 106.037 127.562C106.037 128.909 104.933 130 103.571 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.571 143C102.208 143 101.105 141.909 101.105 140.562C101.105 139.216 102.208 138.125 103.571 138.125C104.933 138.125 106.037 139.216 106.037 140.562C106.037 141.909 104.933 143 103.571 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 4.875C89.8786 4.875 88.7751 3.78422 88.7751 2.4375C88.7751 1.09078 89.8786 0 91.2411 0C92.6035 0 93.707 1.09078 93.707 2.4375C93.707 3.78422 92.6035 4.875 91.2411 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 17.875C89.8786 17.875 88.7751 16.7842 88.7751 15.4375C88.7751 14.0908 89.8786 13 91.2411 13C92.6035 13 93.707 14.0908 93.707 15.4375C93.707 16.7842 92.6035 17.875 91.2411 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 30.0625C89.8786 30.0625 88.7751 28.9717 88.7751 27.625C88.7751 26.2783 89.8786 25.1875 91.2411 25.1875C92.6035 25.1875 93.707 26.2783 93.707 27.625C93.707 28.9717 92.6035 30.0625 91.2411 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 42.25C89.8786 42.25 88.7751 41.1592 88.7751 39.8125C88.7751 38.4658 89.8786 37.375 91.2411 37.375C92.6035 37.375 93.707 38.4658 93.707 39.8125C93.707 41.1592 92.6035 42.25 91.2411 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 55.25C89.8786 55.25 88.7751 54.1592 88.7751 52.8125C88.7751 51.4658 89.8786 50.375 91.2411 50.375C92.6035 50.375 93.707 51.4658 93.707 52.8125C93.707 54.1592 92.6035 55.25 91.2411 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 67.4375C89.8786 67.4375 88.7751 66.3467 88.7751 65C88.7751 63.6533 89.8786 62.5625 91.2411 62.5625C92.6035 62.5625 93.707 63.6533 93.707 65C93.707 66.3467 92.6035 67.4375 91.2411 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 80.4375C89.8786 80.4375 88.7751 79.3467 88.7751 78C88.7751 76.6533 89.8786 75.5625 91.2411 75.5625C92.6035 75.5625 93.707 76.6533 93.707 78C93.707 79.3467 92.6035 80.4375 91.2411 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 92.625C89.8786 92.625 88.7751 91.5342 88.7751 90.1875C88.7751 88.8408 89.8786 87.75 91.2411 87.75C92.6035 87.75 93.707 88.8408 93.707 90.1875C93.707 91.5342 92.6035 92.625 91.2411 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 105.625C89.8786 105.625 88.7751 104.534 88.7751 103.188C88.7751 101.841 89.8786 100.75 91.2411 100.75C92.6035 100.75 93.707 101.841 93.707 103.188C93.707 104.534 92.6035 105.625 91.2411 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 117.812C89.8786 117.812 88.7751 116.722 88.7751 115.375C88.7751 114.028 89.8786 112.938 91.2411 112.938C92.6035 112.938 93.707 114.028 93.707 115.375C93.707 116.722 92.6035 117.812 91.2411 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 130C89.8786 130 88.7751 128.909 88.7751 127.562C88.7751 126.216 89.8786 125.125 91.2411 125.125C92.6035 125.125 93.707 126.216 93.707 127.562C93.707 128.909 92.6035 130 91.2411 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M91.2411 143C89.8786 143 88.7751 141.909 88.7751 140.562C88.7751 139.216 89.8786 138.125 91.2411 138.125C92.6035 138.125 93.707 139.216 93.707 140.562C93.707 141.909 92.6035 143 91.2411 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 4.875C76.7268 4.875 75.6232 3.78422 75.6232 2.4375C75.6232 1.09078 76.7268 0 78.0892 0C79.4517 0 80.5552 1.09078 80.5552 2.4375C80.5552 3.78422 79.4517 4.875 78.0892 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 17.875C76.7268 17.875 75.6232 16.7842 75.6232 15.4375C75.6232 14.0908 76.7268 13 78.0892 13C79.4517 13 80.5552 14.0908 80.5552 15.4375C80.5552 16.7842 79.4517 17.875 78.0892 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 30.0625C76.7268 30.0625 75.6232 28.9717 75.6232 27.625C75.6232 26.2783 76.7268 25.1875 78.0892 25.1875C79.4517 25.1875 80.5552 26.2783 80.5552 27.625C80.5552 28.9717 79.4517 30.0625 78.0892 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 42.25C76.7268 42.25 75.6232 41.1592 75.6232 39.8125C75.6232 38.4658 76.7268 37.375 78.0892 37.375C79.4517 37.375 80.5552 38.4658 80.5552 39.8125C80.5552 41.1592 79.4517 42.25 78.0892 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 55.25C76.7268 55.25 75.6232 54.1592 75.6232 52.8125C75.6232 51.4658 76.7268 50.375 78.0892 50.375C79.4517 50.375 80.5552 51.4658 80.5552 52.8125C80.5552 54.1592 79.4517 55.25 78.0892 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 67.4375C76.7268 67.4375 75.6232 66.3467 75.6232 65C75.6232 63.6533 76.7268 62.5625 78.0892 62.5625C79.4517 62.5625 80.5552 63.6533 80.5552 65C80.5552 66.3467 79.4517 67.4375 78.0892 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 80.4375C76.7268 80.4375 75.6232 79.3467 75.6232 78C75.6232 76.6533 76.7268 75.5625 78.0892 75.5625C79.4517 75.5625 80.5552 76.6533 80.5552 78C80.5552 79.3467 79.4517 80.4375 78.0892 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 92.625C76.7268 92.625 75.6232 91.5342 75.6232 90.1875C75.6232 88.8408 76.7268 87.75 78.0892 87.75C79.4517 87.75 80.5552 88.8408 80.5552 90.1875C80.5552 91.5342 79.4517 92.625 78.0892 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 105.625C76.7268 105.625 75.6232 104.534 75.6232 103.188C75.6232 101.841 76.7268 100.75 78.0892 100.75C79.4517 100.75 80.5552 101.841 80.5552 103.188C80.5552 104.534 79.4517 105.625 78.0892 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 117.812C76.7268 117.812 75.6232 116.722 75.6232 115.375C75.6232 114.028 76.7268 112.938 78.0892 112.938C79.4517 112.938 80.5552 114.028 80.5552 115.375C80.5552 116.722 79.4517 117.812 78.0892 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 130C76.7268 130 75.6232 128.909 75.6232 127.562C75.6232 126.216 76.7268 125.125 78.0892 125.125C79.4517 125.125 80.5552 126.216 80.5552 127.562C80.5552 128.909 79.4517 130 78.0892 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.0892 143C76.7268 143 75.6232 141.909 75.6232 140.562C75.6232 139.216 76.7268 138.125 78.0892 138.125C79.4517 138.125 80.5552 139.216 80.5552 140.562C80.5552 141.909 79.4517 143 78.0892 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 4.875C64.3967 4.875 63.2932 3.78422 63.2932 2.4375C63.2932 1.09078 64.3967 0 65.7591 0C67.1216 0 68.2251 1.09078 68.2251 2.4375C68.2251 3.78422 67.1216 4.875 65.7591 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 17.875C64.3967 17.875 63.2932 16.7842 63.2932 15.4375C63.2932 14.0908 64.3967 13 65.7591 13C67.1216 13 68.2251 14.0908 68.2251 15.4375C68.2251 16.7842 67.1216 17.875 65.7591 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 30.0625C64.3967 30.0625 63.2932 28.9717 63.2932 27.625C63.2932 26.2783 64.3967 25.1875 65.7591 25.1875C67.1216 25.1875 68.2251 26.2783 68.2251 27.625C68.2251 28.9717 67.1216 30.0625 65.7591 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 42.25C64.3967 42.25 63.2932 41.1592 63.2932 39.8125C63.2932 38.4658 64.3967 37.375 65.7591 37.375C67.1216 37.375 68.2251 38.4658 68.2251 39.8125C68.2251 41.1592 67.1216 42.25 65.7591 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 55.25C64.3967 55.25 63.2932 54.1592 63.2932 52.8125C63.2932 51.4658 64.3967 50.375 65.7591 50.375C67.1216 50.375 68.2251 51.4658 68.2251 52.8125C68.2251 54.1592 67.1216 55.25 65.7591 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 67.4375C64.3967 67.4375 63.2932 66.3467 63.2932 65C63.2932 63.6533 64.3967 62.5625 65.7591 62.5625C67.1216 62.5625 68.2251 63.6533 68.2251 65C68.2251 66.3467 67.1216 67.4375 65.7591 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 80.4375C64.3967 80.4375 63.2932 79.3467 63.2932 78C63.2932 76.6533 64.3967 75.5625 65.7591 75.5625C67.1216 75.5625 68.2251 76.6533 68.2251 78C68.2251 79.3467 67.1216 80.4375 65.7591 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 92.625C64.3967 92.625 63.2932 91.5342 63.2932 90.1875C63.2932 88.8408 64.3967 87.75 65.7591 87.75C67.1216 87.75 68.2251 88.8408 68.2251 90.1875C68.2251 91.5342 67.1216 92.625 65.7591 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 105.625C64.3967 105.625 63.2932 104.534 63.2932 103.188C63.2932 101.841 64.3967 100.75 65.7591 100.75C67.1216 100.75 68.2251 101.841 68.2251 103.188C68.2251 104.534 67.1216 105.625 65.7591 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 117.812C64.3967 117.812 63.2932 116.722 63.2932 115.375C63.2932 114.028 64.3967 112.938 65.7591 112.938C67.1216 112.938 68.2251 114.028 68.2251 115.375C68.2251 116.722 67.1216 117.812 65.7591 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 130C64.3967 130 63.2932 128.909 63.2932 127.562C63.2932 126.216 64.3967 125.125 65.7591 125.125C67.1216 125.125 68.2251 126.216 68.2251 127.562C68.2251 128.909 67.1216 130 65.7591 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7591 143C64.3967 143 63.2932 141.909 63.2932 140.562C63.2932 139.216 64.3967 138.125 65.7591 138.125C67.1216 138.125 68.2251 139.216 68.2251 140.562C68.2251 141.909 67.1216 143 65.7591 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 4.875C52.0671 4.875 50.9636 3.78422 50.9636 2.4375C50.9636 1.09078 52.0671 0 53.4295 0C54.792 0 55.8955 1.09078 55.8955 2.4375C55.8955 3.78422 54.792 4.875 53.4295 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 17.875C52.0671 17.875 50.9636 16.7842 50.9636 15.4375C50.9636 14.0908 52.0671 13 53.4295 13C54.792 13 55.8955 14.0908 55.8955 15.4375C55.8955 16.7842 54.792 17.875 53.4295 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 30.0625C52.0671 30.0625 50.9636 28.9717 50.9636 27.625C50.9636 26.2783 52.0671 25.1875 53.4295 25.1875C54.792 25.1875 55.8955 26.2783 55.8955 27.625C55.8955 28.9717 54.792 30.0625 53.4295 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 42.25C52.0671 42.25 50.9636 41.1592 50.9636 39.8125C50.9636 38.4658 52.0671 37.375 53.4295 37.375C54.792 37.375 55.8955 38.4658 55.8955 39.8125C55.8955 41.1592 54.792 42.25 53.4295 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 55.25C52.0671 55.25 50.9636 54.1592 50.9636 52.8125C50.9636 51.4658 52.0671 50.375 53.4295 50.375C54.792 50.375 55.8955 51.4658 55.8955 52.8125C55.8955 54.1592 54.792 55.25 53.4295 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 67.4375C52.0671 67.4375 50.9636 66.3467 50.9636 65C50.9636 63.6533 52.0671 62.5625 53.4295 62.5625C54.792 62.5625 55.8955 63.6533 55.8955 65C55.8955 66.3467 54.792 67.4375 53.4295 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 80.4375C52.0671 80.4375 50.9636 79.3467 50.9636 78C50.9636 76.6533 52.0671 75.5625 53.4295 75.5625C54.792 75.5625 55.8955 76.6533 55.8955 78C55.8955 79.3467 54.792 80.4375 53.4295 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 92.625C52.0671 92.625 50.9636 91.5342 50.9636 90.1875C50.9636 88.8408 52.0671 87.75 53.4295 87.75C54.792 87.75 55.8955 88.8408 55.8955 90.1875C55.8955 91.5342 54.792 92.625 53.4295 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 105.625C52.0671 105.625 50.9636 104.534 50.9636 103.188C50.9636 101.841 52.0671 100.75 53.4295 100.75C54.792 100.75 55.8955 101.841 55.8955 103.188C55.8955 104.534 54.792 105.625 53.4295 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 117.812C52.0671 117.812 50.9636 116.722 50.9636 115.375C50.9636 114.028 52.0671 112.938 53.4295 112.938C54.792 112.938 55.8955 114.028 55.8955 115.375C55.8955 116.722 54.792 117.812 53.4295 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 130C52.0671 130 50.9636 128.909 50.9636 127.562C50.9636 126.216 52.0671 125.125 53.4295 125.125C54.792 125.125 55.8955 126.216 55.8955 127.562C55.8955 128.909 54.792 130 53.4295 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.4295 143C52.0671 143 50.9636 141.909 50.9636 140.562C50.9636 139.216 52.0671 138.125 53.4295 138.125C54.792 138.125 55.8955 139.216 55.8955 140.562C55.8955 141.909 54.792 143 53.4295 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 4.875C38.9152 4.875 37.8117 3.78422 37.8117 2.4375C37.8117 1.09078 38.9152 0 40.2777 0C41.6401 0 42.7437 1.09078 42.7437 2.4375C42.7437 3.78422 41.6401 4.875 40.2777 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 17.875C38.9152 17.875 37.8117 16.7842 37.8117 15.4375C37.8117 14.0908 38.9152 13 40.2777 13C41.6401 13 42.7437 14.0908 42.7437 15.4375C42.7437 16.7842 41.6401 17.875 40.2777 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 30.0625C38.9152 30.0625 37.8117 28.9717 37.8117 27.625C37.8117 26.2783 38.9152 25.1875 40.2777 25.1875C41.6401 25.1875 42.7437 26.2783 42.7437 27.625C42.7437 28.9717 41.6401 30.0625 40.2777 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 42.25C38.9152 42.25 37.8117 41.1592 37.8117 39.8125C37.8117 38.4658 38.9152 37.375 40.2777 37.375C41.6401 37.375 42.7437 38.4658 42.7437 39.8125C42.7437 41.1592 41.6401 42.25 40.2777 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 55.25C38.9152 55.25 37.8117 54.1592 37.8117 52.8125C37.8117 51.4658 38.9152 50.375 40.2777 50.375C41.6401 50.375 42.7437 51.4658 42.7437 52.8125C42.7437 54.1592 41.6401 55.25 40.2777 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 67.4375C38.9152 67.4375 37.8117 66.3467 37.8117 65C37.8117 63.6533 38.9152 62.5625 40.2777 62.5625C41.6401 62.5625 42.7437 63.6533 42.7437 65C42.7437 66.3467 41.6401 67.4375 40.2777 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 80.4375C38.9152 80.4375 37.8117 79.3467 37.8117 78C37.8117 76.6533 38.9152 75.5625 40.2777 75.5625C41.6401 75.5625 42.7437 76.6533 42.7437 78C42.7437 79.3467 41.6401 80.4375 40.2777 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 92.625C38.9152 92.625 37.8117 91.5342 37.8117 90.1875C37.8117 88.8408 38.9152 87.75 40.2777 87.75C41.6401 87.75 42.7437 88.8408 42.7437 90.1875C42.7437 91.5342 41.6401 92.625 40.2777 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 105.625C38.9152 105.625 37.8117 104.534 37.8117 103.188C37.8117 101.841 38.9152 100.75 40.2777 100.75C41.6401 100.75 42.7437 101.841 42.7437 103.188C42.7437 104.534 41.6401 105.625 40.2777 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 117.812C38.9152 117.812 37.8117 116.722 37.8117 115.375C37.8117 114.028 38.9152 112.938 40.2777 112.938C41.6401 112.938 42.7437 114.028 42.7437 115.375C42.7437 116.722 41.6401 117.812 40.2777 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 130C38.9152 130 37.8117 128.909 37.8117 127.562C37.8117 126.216 38.9152 125.125 40.2777 125.125C41.6401 125.125 42.7437 126.216 42.7437 127.562C42.7437 128.909 41.6401 130 40.2777 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.2777 143C38.9152 143 37.8117 141.909 37.8117 140.562C37.8117 139.216 38.9152 138.125 40.2777 138.125C41.6401 138.125 42.7437 139.216 42.7437 140.562C42.7437 141.909 41.6401 143 40.2777 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 4.875C26.5852 4.875 25.4816 3.78422 25.4816 2.4375C25.4816 1.09078 26.5852 0 27.9476 0C29.3101 0 30.4136 1.09078 30.4136 2.4375C30.4136 3.78422 29.3101 4.875 27.9476 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 17.875C26.5852 17.875 25.4816 16.7842 25.4816 15.4375C25.4816 14.0908 26.5852 13 27.9476 13C29.3101 13 30.4136 14.0908 30.4136 15.4375C30.4136 16.7842 29.3101 17.875 27.9476 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 30.0625C26.5852 30.0625 25.4816 28.9717 25.4816 27.625C25.4816 26.2783 26.5852 25.1875 27.9476 25.1875C29.3101 25.1875 30.4136 26.2783 30.4136 27.625C30.4136 28.9717 29.3101 30.0625 27.9476 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 42.25C26.5852 42.25 25.4816 41.1592 25.4816 39.8125C25.4816 38.4658 26.5852 37.375 27.9476 37.375C29.3101 37.375 30.4136 38.4658 30.4136 39.8125C30.4136 41.1592 29.3101 42.25 27.9476 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 55.25C26.5852 55.25 25.4816 54.1592 25.4816 52.8125C25.4816 51.4658 26.5852 50.375 27.9476 50.375C29.3101 50.375 30.4136 51.4658 30.4136 52.8125C30.4136 54.1592 29.3101 55.25 27.9476 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 67.4375C26.5852 67.4375 25.4816 66.3467 25.4816 65C25.4816 63.6533 26.5852 62.5625 27.9476 62.5625C29.3101 62.5625 30.4136 63.6533 30.4136 65C30.4136 66.3467 29.3101 67.4375 27.9476 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 80.4375C26.5852 80.4375 25.4816 79.3467 25.4816 78C25.4816 76.6533 26.5852 75.5625 27.9476 75.5625C29.3101 75.5625 30.4136 76.6533 30.4136 78C30.4136 79.3467 29.3101 80.4375 27.9476 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 92.625C26.5852 92.625 25.4816 91.5342 25.4816 90.1875C25.4816 88.8408 26.5852 87.75 27.9476 87.75C29.3101 87.75 30.4136 88.8408 30.4136 90.1875C30.4136 91.5342 29.3101 92.625 27.9476 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 105.625C26.5852 105.625 25.4816 104.534 25.4816 103.188C25.4816 101.841 26.5852 100.75 27.9476 100.75C29.3101 100.75 30.4136 101.841 30.4136 103.188C30.4136 104.534 29.3101 105.625 27.9476 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 117.812C26.5852 117.812 25.4816 116.722 25.4816 115.375C25.4816 114.028 26.5852 112.938 27.9476 112.938C29.3101 112.938 30.4136 114.028 30.4136 115.375C30.4136 116.722 29.3101 117.812 27.9476 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 130C26.5852 130 25.4816 128.909 25.4816 127.562C25.4816 126.216 26.5852 125.125 27.9476 125.125C29.3101 125.125 30.4136 126.216 30.4136 127.562C30.4136 128.909 29.3101 130 27.9476 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9476 143C26.5852 143 25.4816 141.909 25.4816 140.562C25.4816 139.216 26.5852 138.125 27.9476 138.125C29.3101 138.125 30.4136 139.216 30.4136 140.562C30.4136 141.909 29.3101 143 27.9476 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 4.875C13.4333 4.875 12.3298 3.78422 12.3298 2.4375C12.3298 1.09078 13.4333 0 14.7958 0C16.1582 0 17.2617 1.09078 17.2617 2.4375C17.2617 3.78422 16.1582 4.875 14.7958 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 17.875C13.4333 17.875 12.3298 16.7842 12.3298 15.4375C12.3298 14.0908 13.4333 13 14.7958 13C16.1582 13 17.2617 14.0908 17.2617 15.4375C17.2617 16.7842 16.1582 17.875 14.7958 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 30.0625C13.4333 30.0625 12.3298 28.9717 12.3298 27.625C12.3298 26.2783 13.4333 25.1875 14.7958 25.1875C16.1582 25.1875 17.2617 26.2783 17.2617 27.625C17.2617 28.9717 16.1582 30.0625 14.7958 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 42.25C13.4333 42.25 12.3298 41.1592 12.3298 39.8125C12.3298 38.4658 13.4333 37.375 14.7958 37.375C16.1582 37.375 17.2617 38.4658 17.2617 39.8125C17.2617 41.1592 16.1582 42.25 14.7958 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 55.25C13.4333 55.25 12.3298 54.1592 12.3298 52.8125C12.3298 51.4658 13.4333 50.375 14.7958 50.375C16.1582 50.375 17.2617 51.4658 17.2617 52.8125C17.2617 54.1592 16.1582 55.25 14.7958 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 67.4375C13.4333 67.4375 12.3298 66.3467 12.3298 65C12.3298 63.6533 13.4333 62.5625 14.7958 62.5625C16.1582 62.5625 17.2617 63.6533 17.2617 65C17.2617 66.3467 16.1582 67.4375 14.7958 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 80.4375C13.4333 80.4375 12.3298 79.3467 12.3298 78C12.3298 76.6533 13.4333 75.5625 14.7958 75.5625C16.1582 75.5625 17.2617 76.6533 17.2617 78C17.2617 79.3467 16.1582 80.4375 14.7958 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 92.625C13.4333 92.625 12.3298 91.5342 12.3298 90.1875C12.3298 88.8408 13.4333 87.75 14.7958 87.75C16.1582 87.75 17.2617 88.8408 17.2617 90.1875C17.2617 91.5342 16.1582 92.625 14.7958 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 105.625C13.4333 105.625 12.3298 104.534 12.3298 103.188C12.3298 101.841 13.4333 100.75 14.7958 100.75C16.1582 100.75 17.2617 101.841 17.2617 103.188C17.2617 104.534 16.1582 105.625 14.7958 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 117.812C13.4333 117.812 12.3298 116.722 12.3298 115.375C12.3298 114.028 13.4333 112.938 14.7958 112.938C16.1582 112.938 17.2617 114.028 17.2617 115.375C17.2617 116.722 16.1582 117.812 14.7958 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 130C13.4333 130 12.3298 128.909 12.3298 127.562C12.3298 126.216 13.4333 125.125 14.7958 125.125C16.1582 125.125 17.2617 126.216 17.2617 127.562C17.2617 128.909 16.1582 130 14.7958 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7958 143C13.4333 143 12.3298 141.909 12.3298 140.562C12.3298 139.216 13.4333 138.125 14.7958 138.125C16.1582 138.125 17.2617 139.216 17.2617 140.562C17.2617 141.909 16.1582 143 14.7958 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 4.875C1.10371 4.875 0.000191689 3.78422 0.000191689 2.4375C0.000191689 1.09078 1.10371 0 2.46616 0C3.82861 0 4.93213 1.09078 4.93213 2.4375C4.93213 3.78422 3.82861 4.875 2.46616 4.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 17.875C1.10371 17.875 0.000191689 16.7842 0.000191689 15.4375C0.000191689 14.0908 1.10371 13 2.46616 13C3.82861 13 4.93213 14.0908 4.93213 15.4375C4.93213 16.7842 3.82861 17.875 2.46616 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 30.0625C1.10371 30.0625 0.000191689 28.9717 0.000191689 27.625C0.000191689 26.2783 1.10371 25.1875 2.46616 25.1875C3.82861 25.1875 4.93213 26.2783 4.93213 27.625C4.93213 28.9717 3.82861 30.0625 2.46616 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 42.25C1.10371 42.25 0.000191689 41.1592 0.000191689 39.8125C0.000191689 38.4658 1.10371 37.375 2.46616 37.375C3.82861 37.375 4.93213 38.4658 4.93213 39.8125C4.93213 41.1592 3.82861 42.25 2.46616 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 55.25C1.10371 55.25 0.000191689 54.1592 0.000191689 52.8125C0.000191689 51.4658 1.10371 50.375 2.46616 50.375C3.82861 50.375 4.93213 51.4658 4.93213 52.8125C4.93213 54.1592 3.82861 55.25 2.46616 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 67.4375C1.10371 67.4375 0.000191689 66.3467 0.000191689 65C0.000191689 63.6533 1.10371 62.5625 2.46616 62.5625C3.82861 62.5625 4.93213 63.6533 4.93213 65C4.93213 66.3467 3.82861 67.4375 2.46616 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 80.4375C1.10371 80.4375 0.000191689 79.3467 0.000191689 78C0.000191689 76.6533 1.10371 75.5625 2.46616 75.5625C3.82861 75.5625 4.93213 76.6533 4.93213 78C4.93213 79.3467 3.82861 80.4375 2.46616 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 92.625C1.10371 92.625 0.000191689 91.5342 0.000191689 90.1875C0.000191689 88.8408 1.10371 87.75 2.46616 87.75C3.82861 87.75 4.93213 88.8408 4.93213 90.1875C4.93213 91.5342 3.82861 92.625 2.46616 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 105.625C1.10371 105.625 0.000191689 104.534 0.000191689 103.188C0.000191689 101.841 1.10371 100.75 2.46616 100.75C3.82861 100.75 4.93213 101.841 4.93213 103.188C4.93213 104.534 3.82861 105.625 2.46616 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 117.812C1.10371 117.812 0.000191689 116.722 0.000191689 115.375C0.000191689 114.028 1.10371 112.938 2.46616 112.938C3.82861 112.938 4.93213 114.028 4.93213 115.375C4.93213 116.722 3.82861 117.812 2.46616 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 130C1.10371 130 0.000191689 128.909 0.000191689 127.562C0.000191689 126.216 1.10371 125.125 2.46616 125.125C3.82861 125.125 4.93213 126.216 4.93213 127.562C4.93213 128.909 3.82861 130 2.46616 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.46616 143C1.10371 143 0.000191689 141.909 0.000191689 140.562C0.000191689 139.216 1.10371 138.125 2.46616 138.125C3.82861 138.125 4.93213 139.216 4.93213 140.562C4.93213 141.909 3.82861 143 2.46616 143Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 17.875C153.172 17.875 152.068 16.7842 152.068 15.4375C152.068 14.0908 153.172 13 154.534 13C155.896 13 157 14.0908 157 15.4375C157 16.7842 155.896 17.875 154.534 17.875Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 30.0625C153.172 30.0625 152.068 28.9717 152.068 27.625C152.068 26.2783 153.172 25.1875 154.534 25.1875C155.896 25.1875 157 26.2783 157 27.625C157 28.9717 155.896 30.0625 154.534 30.0625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 42.25C153.172 42.25 152.068 41.1592 152.068 39.8125C152.068 38.4658 153.172 37.375 154.534 37.375C155.896 37.375 157 38.4658 157 39.8125C157 41.1592 155.896 42.25 154.534 42.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 55.25C153.172 55.25 152.068 54.1592 152.068 52.8125C152.068 51.4658 153.172 50.375 154.534 50.375C155.896 50.375 157 51.4658 157 52.8125C157 54.1592 155.896 55.25 154.534 55.25Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 67.4375C153.172 67.4375 152.068 66.3467 152.068 65C152.068 63.6533 153.172 62.5625 154.534 62.5625C155.896 62.5625 157 63.6533 157 65C157 66.3467 155.896 67.4375 154.534 67.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 80.4375C153.172 80.4375 152.068 79.3467 152.068 78C152.068 76.6533 153.172 75.5625 154.534 75.5625C155.896 75.5625 157 76.6533 157 78C157 79.3467 155.896 80.4375 154.534 80.4375Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 92.625C153.172 92.625 152.068 91.5342 152.068 90.1875C152.068 88.8408 153.172 87.75 154.534 87.75C155.896 87.75 157 88.8408 157 90.1875C157 91.5342 155.896 92.625 154.534 92.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 105.625C153.172 105.625 152.068 104.534 152.068 103.188C152.068 101.841 153.172 100.75 154.534 100.75C155.896 100.75 157 101.841 157 103.188C157 104.534 155.896 105.625 154.534 105.625Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 117.812C153.172 117.812 152.068 116.722 152.068 115.375C152.068 114.028 153.172 112.938 154.534 112.938C155.896 112.938 157 114.028 157 115.375C157 116.722 155.896 117.812 154.534 117.812Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 130C153.172 130 152.068 128.909 152.068 127.562C152.068 126.216 153.172 125.125 154.534 125.125C155.896 125.125 157 126.216 157 127.562C157 128.909 155.896 130 154.534 130Z" fill="#DBE4EE" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M154.534 143C153.172 143 152.068 141.909 152.068 140.562C152.068 139.216 153.172 138.125 154.534 138.125C155.896 138.125 157 139.216 157 140.562C157 141.909 155.896 143 154.534 143Z" fill="#DBE4EE" />
                            </svg>

                        </div>
                        <Slider {...settings} className={styles.reviewMobSlider}>
                            <div className={styles.reviewSlide}>
                                <div className={styles.innerSlide}>
                                    {this.starSvg(5)}
                                    <p>The people we associate with can make or break us. GoalMogul offers a fertile and healthy environment where you can truly surround yourself with like-minded individuals who are interested in supporting you and following their dreams.</p>
                                    <div className={styles.arrowDiv}>
                                        <div className={styles.arrow}></div>
                                    </div>
                                </div>
                                <div className={styles.reviewrImage}>
                                    <div className={styles.reviewrSteps}>
                                        <img src={reviewimage} />
                                    </div>
                                    <div className={styles.reviewerDet}>
                                        <p className={styles.reviewrName}><b>Bob Proctor</b></p>
                                        <p>Law of Attraction Expert, Featured in 'The Secret' and Bestselling Author of 'You Were Born Rich’</p>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.reviewSlide}>
                                <div className={styles.innerSlide}>
                                    {this.starSvg(5)}
                                    <p>Sharing goals with friends is one of life’s greatest keys to success. If you have unrealized dreams and goals, then take a leap of faith and share them with the world. This little known trick will help you manifest and materialize your desires. GoalMogul has brilliantly laid out a path that will nurture your mind for success. Follow it and watch your dreams unfold and your relationships blossom.</p>
                                    <div className={styles.arrowDiv}>
                                        <div className={styles.arrow}></div>
                                    </div>

                                </div>
                                <div className={styles.reviewrImage}>
                                    <div className={styles.reviewrSteps}>
                                        <img src={reviewimage2} />
                                    </div>
                                    <div className={styles.reviewerDet}>
                                        <p className={styles.reviewrName}><b>Mark Victor Hansen</b> </p>
                                        <p> Co-Creator of Chicken Soup Series, 500 Million Books Sold, 2x Guinness Record Holder, 59x NY Times
#1 Bestselling Author</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.reviewSlide}>
                                <div className={styles.innerSlide}>
                                    {this.starSvg(5)}
                                    <p>Ride-sharing and home-sharing revolutionized the world by making traveling easier. With GoalMogul, goal-sharing and helping each other will make your life easier. The possibilities are endless.</p>
                                    <div className={styles.arrowDiv}>
                                        <div className={styles.arrow}></div>
                                    </div>
                                </div>
                                <div className={styles.reviewrImage}>
                                    <div className={styles.reviewrSteps}>
                                        <img src={reviewimage3} />
                                    </div>
                                    <div className={styles.reviewerDet}>
                                        <p className={styles.reviewrName}><b>John Assaraf</b></p>
                                        <p>Leading Brain & Achievement Expert, Thought-Leader on The Ellen Degeneres Show, Anderson Cooper, and Larry King Live, 2x Billion Dollar Business Exits</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>


                    <img src={rectangleBlob} className={styles.rectangleBlob} />
                </div>
                <div className={styles.logoDiv}>
                    <div className={styles.innerLogoDiv}>
                        <img src={CBCLogo} className={styles.cbcLogo} />
                        <img src={NBCLogo} className={styles.nbcLogo} />
                        <img src={DJLLogo} className={styles.djLogo} />
                        <img src={FOXLogo} className={styles.foxLogo} />
                        <img src={PBSLogo} className={styles.pbsLogo} />
                    </div>
                    <div className={styles.innerLogoDivMob}>

                        {/* <Slider  {...settingsMob}> */}
                        <img src={CBCLogo} className={styles.cbcLogo} />
                        <img src={NBCLogo} className={styles.nbcLogo} />
                        <img src={FOXLogo} className={styles.foxLogo} />
                        <img src={PBSLogo} className={styles.pbsLogo} />
                        {/* </Slider> */}
                    </div>

                </div>
            </div>
        )
    }
}