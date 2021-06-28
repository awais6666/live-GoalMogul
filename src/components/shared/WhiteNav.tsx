import React from 'react'
import navLogo from '../../assets/navLogo.png'
import './whitenav.scss'
import playstore from './../../assets/mobPlaystore.png'
import appStore from './../../assets/mobIos.png'

function WhiteNav() {
    return (
        <div className="WhiteNav">
            <div className="innerNav">
                <img src={navLogo} />
            </div>
            <div className="mobDownload">
                <div className="downloadBtn">
                <img src={playstore}/>
                <img src={appStore}/>
                </div>
            </div>
        </div>
    )
}

export default WhiteNav
