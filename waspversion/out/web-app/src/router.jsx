import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import App from './ext-src/App'

import createAuthRequiredPage from "./auth/pages/createAuthRequiredPage"

import MainPage from './ext-src/MainPage'
import CoverLetterPage from './ext-src/CoverLetterPage'
import LoginPage from './ext-src/LoginPage'
import JobsPage from './ext-src/JobsPage'
import ProfilePage from './ext-src/ProfilePage'
import CheckoutPage from './ext-src/CheckoutPage'

import OAuthCodeExchange from "./auth/pages/OAuthCodeExchange"

const router = (
  <Router>
    <App>
    <Switch>
      <Route exact path="/" component={ MainPage }/>
      <Route exact path="/cover-letter/:id" component={ CoverLetterPage }/>
      <Route exact path="/login" component={ LoginPage }/>
      <Route exact path="/jobs" component={ createAuthRequiredPage(JobsPage) }/>
      <Route exact path="/profile" component={ createAuthRequiredPage(ProfilePage) }/>
      <Route exact path="/checkout" component={ createAuthRequiredPage(CheckoutPage) }/>
      <Route exact path="/auth/login/google">
        <OAuthCodeExchange pathToApiServerRouteHandlingOauthRedirect="/auth/google/callback" />
      </Route>
    </Switch>
    </App>
  </Router>
)

export default router
