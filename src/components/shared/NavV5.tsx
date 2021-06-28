import React from 'react'
import navLogo from '../../assets/logoV5.png'
import './whitenav.scss'
import playstore from './../../assets/mobPlaystore.png'
import appStore from './../../assets/mobIos.png'
import { withRouter } from 'react-router'

function NavV5(props: any) {
    return (
        <div className="navV5">
            <div className="innerNav">
                <div className="logoDiv">
                    <img src={navLogo} onClick={() => props.history.push('/splashscreenv6')} />
                </div>
            </div>
            <div className="mobDownload">
                <div className="downloadBtn">
                    <img src={playstore} />
                    <img src={appStore} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(NavV5)
