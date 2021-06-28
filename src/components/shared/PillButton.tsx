import * as React from "react"
import "../../styles/colors.css"
import styles from "./PillButton.module.css"

interface PillButtonProps {
  style: string /* primary | default | disabled */
  type: string /* solid | outline | text */
  buttonText: string
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  selected?: boolean
  className?: string
}
export default function PillButton(props: PillButtonProps) {
  function computeClassNames() {
    return `${styles.button} ${styles[`${props.style}-${props.type}`]} ${
      props.selected ? styles.selected : ""
    } ${props.className}`
  }
  return (
    <button
      className={computeClassNames()}
      disabled={props.style === "disabled"}
      onClick={props.clickHandler}
    >
      {props.buttonText}
    </button>
  )
}
