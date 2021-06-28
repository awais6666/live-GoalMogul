import * as React from "react"
import "../../styles/colors.css"
import "../../styles/sizes.css"
import styles from "./Collapse.module.css"

interface CollapseState {
  open: boolean
}

interface CollapseProps {
  header: string
  children: React.ReactNode
  defaultOpen: boolean
}

export default class Collapse extends React.Component<
  CollapseProps,
  CollapseState
> {
  state = {
    open: true,
  }

  componentDidMount() {
    this.setState({
      open: this.props.defaultOpen,
    })
  }

  toggleOpen() {
    this.setState((prevState) => ({ ...prevState, open: !prevState.open }))
  }

  render() {
    return (
      <div className={styles.collapse}>
        <div className={styles.header} onClick={this.toggleOpen.bind(this)}>
          {this.props.header}
          <svg
            className={this.state.open ? "" : styles.rotate}
            width='16'
            height='11'
            viewBox='0 0 16 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.88 0.439941L8 6.55994L14.12 0.439941L16 2.33327L8 10.3333L0 2.33327L1.88 0.439941Z'
              fill='black'
            />
          </svg>
        </div>
        <div
          className={`${styles.content} ${this.state.open ? "" : styles.hide}`}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
