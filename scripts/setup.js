(function() {
  "use strict";

  var f = require("org/arangodb/foxx/authentication");

  // set up users
  var users = new f.Users(applicationContext);
  users.setup({ journalSize: 1 * 1024 * 1024 });

  // set up a default admin user
  users.add("admin", "secret", true, {
    name: "Root",
    admin: true
  });

  // set up sessions
  var s = new f.Sessions(applicationContext);
  s.setup();
}());
