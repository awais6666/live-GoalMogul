import React from "react"
import styles from "./AppDownload.module.css"
import { AppDownloadClick } from "../../analyticsEvents"
/**
 * Show App download icons and links
 */
export default class AppDownload extends React.Component {
  render() {
    return (
      <div className={styles.appDownload}>
        <ul>
          <li>
            <a
              // href='https://apps.apple.com/us/app/goalmogul/id1441503669'
              target='_blank'
              rel='noopener noreferrer'
            // onClick={() => {
            //   window.analytics.track(AppDownloadClick, {
            //     store: "iOS App Store",
            //   })
            // }}
            >
              <svg
                width='26'
                height='31'
                viewBox='0 0 26 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M18.9286 0.0385742C17.3829 0.103203 15.51 1.06505 14.4016 2.3582C13.4051 3.50661 12.5353 5.33941 12.7698 7.09678C14.4955 7.23136 16.2539 6.2235 17.3281 4.92969C18.4002 3.63356 19.126 1.83483 18.9286 0.0385742ZM18.4911 30.6225C20.5854 30.5836 21.9118 28.7281 23.1942 26.8612C24.5992 24.8163 25.2197 22.8336 25.3122 22.5379C25.3174 22.5215 25.3209 22.5103 25.3228 22.5045C25.3219 22.5041 25.3193 22.5031 25.3151 22.5014C25.1136 22.4198 21.2373 20.8498 21.1988 16.3117C21.1609 12.5641 24.161 10.6999 24.4913 10.4947C24.5028 10.4875 24.511 10.4824 24.5158 10.4793C22.71 7.84862 19.8983 7.48791 18.8964 7.44671C17.433 7.2993 16.0132 7.85654 14.8532 8.31184C14.116 8.60117 13.4837 8.84934 13.0118 8.84934C12.4865 8.84934 11.8369 8.59251 11.1079 8.30429C10.1537 7.92706 9.06344 7.49603 7.93788 7.51665C5.33083 7.55553 2.92503 9.02811 1.58242 11.3555C-1.12885 16.0421 0.887121 22.9865 3.52845 26.7865C4.82134 28.645 6.35869 30.7367 8.38049 30.6614C9.28321 30.6253 9.92567 30.3528 10.5901 30.0709C11.358 29.7452 12.1552 29.407 13.4174 29.407C14.6195 29.407 15.3798 29.7347 16.1112 30.05C16.8106 30.3514 17.4835 30.6415 18.4911 30.6225Z'
                  fill='white'
                />
              </svg>
              <div className={styles.textWrapper}>
                <span className={styles.textRow1}>Available on the</span>
                {/* <span className={styles.avaibleButtonSub}>Available on the</span> */}
                <span className={styles.textRow2}>App Store</span>
              </div>
            </a>
          </li>
          <li>
            <a
              // href='https://play.google.com/store/apps/details?id=com.goalmogul.goalmogulbeta'
              target='_blank'
              rel='noopener noreferrer'
            // onClick={() => {
            //   window.analytics.track(AppDownloadClick, {
            //     store: "Google Play Store",
            //   })
            // }}
            >
              <svg
                width='27'
                height='30'
                viewBox='0 0 27 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                {/* <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.0390625 2.77157V28.0002C0.0390625 28.8783 0.546764 29.6375 1.28427 29.9998L15.8837 15.3816L1.29014 0.769043C0.549461 1.1302 0.0390625 1.8912 0.0390625 2.77157ZM4.55604 29.2421L20.5132 20.0173L17.141 16.6409L4.55604 29.2421ZM25.4732 13.6172C26.004 14.024 26.3463 14.6649 26.3463 15.3859C26.3463 16.096 26.0143 16.7284 25.4972 17.1359L22.1078 19.0954L18.3986 15.3816L22.1052 11.6701L25.4732 13.6172ZM20.5106 10.7485L4.56532 1.53058L17.141 14.1224L20.5106 10.7485Z'
                  fill='white'
                /> */}
                <path
                  d='M5.29719 2.948C5.01325 3.02602 4.8125 3.28633 4.8125 3.73404C4.8125 5.048 4.8125 17.4387 4.8125 17.4387C4.8125 17.4387 4.8125 30.8291 4.8125 31.4205C4.8125 31.7457 4.94794 31.9637 5.15625 32.0447L19.0307 17.4147L5.29719 2.948Z'
                  fill='#4DB6AC'
                />
                <path
                  d='M22.8505 13.3875L17.1394 9.89042C17.1394 9.89042 6.65846 3.47157 6.04246 3.09459C5.77571 2.93126 5.51309 2.88824 5.29721 2.94803L19.0314 17.4147L22.8505 13.3875Z'
                  fill='#DCE775'
                />
                <path
                  d='M5.78669 31.939C6.15244 31.7144 16.2944 25.5041 22.8814 21.4703L19.0307 17.4147L5.15625 32.0447C5.32675 32.111 5.54537 32.0862 5.78669 31.939Z'
                  fill='#D32F2F'
                />
                <path
                  d='M28.4611 16.8226C27.9139 16.5097 22.8924 13.413 22.8924 13.413L22.8505 13.3875L19.0307 17.4146L22.8814 21.4703C25.9284 19.6043 28.2171 18.2036 28.422 18.0775C29.071 17.6808 29.0084 17.1354 28.4611 16.8226Z'
                  fill='#FBC02D'
                />
              </svg>
              <div className={styles.textWrapper}>
                <span className={styles.textRow1}>Get it on</span>
                {/* <span className={styles.avaibleButtonSub}>Get it on</span> */}
                <span className={styles.textRow2}>
                  <b>Google</b> play
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
