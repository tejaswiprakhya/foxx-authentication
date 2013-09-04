$(function () {
  var loginForm = $("form[name=login]"),
    logoutForm = $("form[name=logout]"),
    registerForm = $("form[name=register]");

  loginForm.on("submit", function (e) {
    var form = $(e.target),
      username = $("input[name='username']", form).val(),
      password = $("input[name='password']", form).val(),
      data = { username: username, password: password };

    $.ajax({
      url: "login",
      type: "post",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        console.log("Welcome, %s", result.user);
        loginForm.hide();
        registerForm.hide();
        $(".username", logoutForm).text(result.user);
        logoutForm.show();
      },
      error: function (result) {
        console.log("Error: %s", result.responseJSON.error);
      }
    });

    e.preventDefault();
  });

  registerForm.on("submit", function (e) {
    var form = $(e.target),
      name = $("input[name='name']", form).val(),
      username = $("input[name='username']", form).val(),
      password = $("input[name='password']", form).val(),
      data = { username: username, password: password, name: name };

    $.ajax({
      url: "register",
      type: "post",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        console.log("Registered, %s", result.user.identifier);
        loginForm.hide();
        registerForm.hide();
        $(".username", logoutForm).text(result.user.identifier);
        logoutForm.show();
      },
      error: function (result) {
        console.log("Error: %s", result.responseJSON.error);
      }
    });

    e.preventDefault();
  });

  logoutForm.hide().on("submit", function (e) {
    $.ajax({
      url: "logout",
      type: "post",
      dataType: "json",
      success: function (result) {
        console.log("Bye");
        logoutForm.hide();
        loginForm.show();
        registerForm.show();
      },
      error: function (result) {
        console.log("Error: %s", result.responseJSON.error);
      }
    });

    e.preventDefault();
  });
});
