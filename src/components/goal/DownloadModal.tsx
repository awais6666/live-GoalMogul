import React from "react"
import styles from "./DownloadModal.module.css"
import appPreview1 from "../../assets/images/app_preview_1.png"
import { IoIosCloseCircle } from "react-icons/io"
import AppDownload from "../appDownload/AppDownload"
import PillButton from "../shared/PillButton"

interface PropsInterface {
  toggleOpenState: (e: React.MouseEvent) => void
  goalId: string
}

export default class DownloadModal extends React.Component<PropsInterface> {
  redirectAppGoal() {
    window.location.href = `goalmogul://goal/${this.props.goalId}`
  }

  render() {
    return (
      <div className={styles.downloadModal}>
        <div
          className={styles.overlay}
          onClick={this.props.toggleOpenState}
        ></div>
        <div className={styles.modal}>
          <span
            className={styles.closeModalX}
            onClick={this.props.toggleOpenState}
          >
            <IoIosCloseCircle />
          </span>
          <div className={styles.modalText}>
            <h1>Download to continue</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </p>
            <AppDownload />
            <img src={appPreview1}></img>
            <div className={styles.buttonWrapper}>
              <PillButton
                type='solid'
                style='primary'
                buttonText='Open in App'
                clickHandler={this.redirectAppGoal.bind(this)}
              ></PillButton>
            </div>
            <div className={`${styles.buttonWrapper} ${styles.closeButton}`}>
              <PillButton
                type='text'
                style='primary'
                buttonText='Close'
                clickHandler={this.props.toggleOpenState}
              ></PillButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
