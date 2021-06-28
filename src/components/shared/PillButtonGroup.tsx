import React, { Component } from "react"
import "../../styles/colors.css"
import styles from "./PillButtonGroup.module.css"
import PillButton from "./PillButton"

interface PillButtonGroupProps {
  className?: string
  selectedValue: any
  options: Array<{
    buttonText: string
    value: any
  }>
  onChange: Function
  style: string /* primary | default | disabled */
  type: string /* solid | outline | text */
}

interface PillButtonGroupState {
  selectedButtonIdx: number | null
}
/**
 * A group of Pill Buttons that are selectable
 * Selecting one button will de-select other buttons
 */
export default class PillButtonGroup extends React.Component<
  PillButtonGroupProps,
  PillButtonGroupState
> {
  state = {
    selectedButtonIdx: null,
  }
  generateButtons() {
    return this.props.options.map((option, index) => {
      return (
        <PillButton
          buttonText={option.buttonText}
          style={this.props.style}
          type={this.props.type}
          clickHandler={(e) => {
            e.preventDefault()
            this.props.onChange(option.value)
            this.setState({ selectedButtonIdx: index })
          }}
          selected={this.state.selectedButtonIdx === index}
        ></PillButton>
      )
    })
  }
  render() {
    return (
      <div className={`${styles.buttonWrapper} ${this.props.className}`}>
        {this.generateButtons()}
      </div>
    )
  }
}
