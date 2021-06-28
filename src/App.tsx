import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

import Nav from "./components/shared/Nav"
import WhiteNav from "./components/shared/WhiteNav"
import Footer from "./components/shared/Footer"
import BlackFooter from "./components/shared/blackFooter"
import SplashScreen from "./components/splash/SplashScreen"
import RegisterScreen from "./components/registration/RegisterScreen"
import LoginScreen from "./components/login/LoginScreen"
import PasswordResetRequestScreen from "./components/password/PasswordResetRequestScreen"
import PasswordResetScreen from "./components/password/SetPasswordScreen"
import PrivacyPolicyScreen from "./components/legal/PrivacyPolicyScreen"
import EmailVerificationScreen from "./components/verifications/EmailVerificationScreen"
import PhoneVerificationScreen from "./components/verifications/PhoneVerificationScreen"
import ProfileScreen from "./components/profile/ProfileScreen"
import AccountSettingScreen from "./components/accountSettings/AccountSettingScreen"
import ResendVerificationScreen from "./components/verifications/ResendVerificationScreen"
import TermsScreen from "./components/legal/TermsScreen"
import GoalScreen from "./components/goal/GoalScreen"
import Subscribers from "./components/newsletter/Subscribers"
import SplashScreenV2 from "./components/splash/splashScreenv2"
import SplashScreenV2dot1 from "./components/splash/splashScreenv2-1"
import SplashScreen1c from "./components/splash/SplashScreen1c"
import SplashScreen2a from "./components/splash/SplashScreen2a"
import SplashScreenV4 from "./components/splash/SplashScreenv4"
import SplashScrenV5 from "./components/splash/SplashScreenv5"
import NavV5 from "./components/shared/NavV5"
import SplashScrenV6 from "./components/splash/SplashScreenv6"
import SplashScrenV7 from "./components/splash/SplashScreenv7"

declare global {
  interface Window {
    analytics: any
  }
}

function App() {
  let [path, setPath] = useState("")
  useEffect(() => {
    setPath(window.location.pathname)
    console.log(path)
  }, [path])
  return (
    <Router>
      <div>
        {path && path.toLocaleLowerCase() === '/splashscreenv4' ?
          // <NavV5></NavV5>
          <WhiteNav />
          :
          path.toLocaleLowerCase() === '/' ?
            <Nav></Nav>
            :
          <NavV5></NavV5>

        }
        <Switch>
          <Route path='/goal/:publicIdentifier' component={GoalScreen} />
          <Route
            path='/resend-verification/:type'
            component={ResendVerificationScreen}
          />
          <Route path='/settings' component={AccountSettingScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route
            path='/phone-verification/'
            component={PhoneVerificationScreen}
          />
          <Route
            path='/email-verification/:token'
            component={EmailVerificationScreen}
          />
          <Route path='/report'>
            {/* TODO: find a better way to do this redirect */}
            {() => {
              window.location.href = "https://forms.gle/odUiWoGJuyv8dtQK6"
            }}
          </Route>
          <Route path='/privacy' component={PrivacyPolicyScreen} />
          <Route path='/newsletter/subscriber-list' component={Subscribers} />
          <Route path='/terms' component={TermsScreen} />
          <Route
            path={["/password-reset/:token", "/set-password/:token"]}
            component={PasswordResetScreen}
          />
          <Route
            exact
            path='/password-reset'
            component={PasswordResetRequestScreen}
          />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          {/* v1 
            import from splashscreen.tsx
          */}
          {/* <Route path={"/v1"} component={SplashScreen} /> */}

          {/* <Route path={"/V1c"} component={SplashScreen1c} /> */}
          {/* <Route path={"/V2a"} component={SplashScreen2a} /> */}

          {/* <Route path={["/invite/:code", "/v2.1"]} component={SplashScreenV2dot1} /> */}
          <Route path='/SplashScreenV4' component={SplashScreenV4} />  {/* Yana version */}
          <Route path='/SplashScreenV5' component={SplashScrenV5} />  {/* raza version */}
          <Route path='/SplashScreenV6' component={SplashScrenV6} /> {/* v6 8 frames version */}
          <Route path='/COMING-SOON' component={SplashScrenV7} /> {/* v7 comingsoon version */}
          <Route path={["/invite/:code", "/"]} component={SplashScreenV2} /> {/* current Deployed version */}

        </Switch>
        {path && path.toLocaleLowerCase() === '/splashscreenv4' ?
          <BlackFooter />
          : 
            <Footer></Footer>
        }
      </div>
    </Router>
  )
}

export default App
