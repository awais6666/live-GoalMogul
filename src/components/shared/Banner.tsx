import * as React from "react"
import "../../styles/colors.css"
import "../../styles/sizes.css"
import styles from "./Banner.module.css"

interface BannerProps {
  type: string
}

export default class Banner extends React.Component<BannerProps> {
  bannerIcon() {
    switch (this.props.type) {
      case "error":
        return (
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.66602 8.33325H7.33268V4.99992H8.66602V8.33325ZM8.66602 10.9999H7.33268V9.66659H8.66602V10.9999ZM0.666016 12.9999H15.3327L7.99935 0.333252L0.666016 12.9999Z'
              fill='currentColor'
            />
          </svg>
        )
    }
  }

  render() {
    return (
      <div className={`${styles.banner} ${styles[this.props.type]}`}>
        {this.bannerIcon()}
        {this.props.children}
      </div>
    )
  }
}
