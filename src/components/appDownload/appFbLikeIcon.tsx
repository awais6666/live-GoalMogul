import React from "react"
import styles from "./AppDownload.module.css"
import { AppDownloadClick } from "../../analyticsEvents"
import fbLikeUs from "../../assets/images/fbLikeUs.svg"

/**
 * Show App download icons and links
 */
export default class FbLikeUSButton extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: "0px 20px",
          marginLeft: "auto",
        }}
      >
        <a
          href='https://www.facebook.com/goalmogul/'
          target='_blank'
          rel='noopener noreferrer'
          //   onClick={() => {
          //     window.analytics.track(AppDownloadClick, {
          //       store: "Google Play Store",
          //     })
          //   }}
        >
          <img className={styles.fbButton} src={fbLikeUs} />
        </a>
      </div>
    )
  }
}
