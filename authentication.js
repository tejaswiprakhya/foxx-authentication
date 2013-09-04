/*jslint indent: 2, nomen: true, maxlen: 100, white: true, plusplus: true, unparam: true */
/*global require, applicationContext */

////////////////////////////////////////////////////////////////////////////////
/// @brief An example Foxx-Application for ArangoDB
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2013 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Jan Steemann
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function() {
  "use strict";

  var Foxx = require("org/arangodb/foxx"),
    controller = new Foxx.Controller(applicationContext),
    NoAdmin = function() {},
    userIsAdmin = function (req) {
      if (!(req.user && req.user.isAdmin)) {
        throw new NoAdmin();
      }
    };

  NoAdmin.prototype = new Error();

  controller.activateAuthentication({
    type: "cookie",
    cookieName: "myCookie",
    cookieLifetime: 360000,
    sessionLifetime: 600
  });

  /** Allow users to login
   *
   * Standard Login with adjusted onSuccess handler
   */
  controller.login("/login", {
    onSuccess: function (req, res) {
      req.currentSession.set("fancy", "pants");
      res.json({
        msg: "Logged in!",
        user: req.user.identifier,
        key: req.currentSession._key
      });
    }
  });

  /** Allow users to logout
   *
   * Standard Logout, no adjustments
   */
  controller.logout("/logout");

  // TODO: Allow users to register

  /** Increase counter by one for this session
   *
   * Demonstration of the Session Functionality for Foxx,
   * simple case of authentication: Every logged in user can use it
   */
  controller.get('/counter', function (req, res) {
    req.currentSession.set("counter", 1 + (req.currentSession.get("counter") || 0));

    res.json({
      "counter": req.currentSession.get("counter")
    });
  }).onlyIfAuthenticated(401, "Only logged in users can count");

  /** Dump all Session data
   *
   * Just to show you all data in this session,
   * also demonstrates how to restrict a route to admins only
   */
  controller.get('/dump', function (req, res) {
    res.json({
      "session": req.currentSession.data,
    });
  }).onlyIf(userIsAdmin).errorResponse(NoAdmin, 401, "User has to be admin");
}());
