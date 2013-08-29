(function() {
  "use strict";

  require("console").log("%s", "setting up app " + applicationContext.name);

  var f = require("org/arangodb/foxx/authentication");

  // set up users
  var users = new f.Users(applicationContext);
  users.setup({ journalSize: 1 * 1024 * 1024 });

  // set up a default admin user
  users.add("admin", "secret");

  // set up sessions
  var s = new f.Sessions(applicationContext);
  s.setup();
}());
