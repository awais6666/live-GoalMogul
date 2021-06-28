import React from 'react'
import logo from './../../assets/Logo 1.png'
import { NavLink } from 'react-router-dom'
import playstore from './../../assets/Google-Play.png'
import appstore from './../../assets/app-store.svg'

function BlackFooter() {
    return (
        <div className="blackFooter">
            <div className="innerFooter">
                <div className="footerDetail">
                    <div className="footerLogo">
                        <img src={logo} />
                    </div>
                    <div className="footerLinkDiv">
                        <NavLink className="footerLink" to="/contact-us">Contact Support</NavLink>
                        <NavLink className="footerLink" to="/terms">Terms of Service </NavLink>
                        <NavLink className="footerLink" to="/privacy">Privacy Policy </NavLink>
                    </div>
                    <div>
                        <p className="copywrightYear">© 2021 GoalMogul.com</p>
                    </div>
                </div>
                <div className="footerDownload">
                    <p>Download Now</p>
                    <div className="AppDownloadDiv">
                        <div className="buttonDown" style={{ backgroundImage: `url(${playstore})` }} > </div>
                        <div className="buttonDown" style={{ backgroundImage: `url(${appstore})` }} > </div>
                        {/* <img src={appstore} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlackFooter
