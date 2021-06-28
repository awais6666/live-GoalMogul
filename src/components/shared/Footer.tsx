import React from "react"
import "./Footer.scss"

/**
 * Footer component shared by all pages
 */
export default function Footer() {
  return (
    <footer>
      <div className='grow p33'>
        <p>&copy; {new Date().getFullYear()} GoalMogul, Inc.</p>
      </div>
      <div className="p33">
        <ul>
          {/* <li>
            <a href='/'>GoalMogul Home</a>
          </li> */}
          <li>
            <a href='mailto:support@goalmogul.com'>Contact Support</a>
          </li>
          <li>
            <a href='/terms'>Terms of Service</a>
          </li>
          <li>
            <a href='/privacy'>Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="p33">

      </div>
    </footer>
  )
}
