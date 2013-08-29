$(function () {
  var loginForm = $("form[name=login]"),
    logoutForm = $("form[name=logout]");

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
        $(".username", logoutForm).text(result.user);
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
      },
      error: function (result) {
        console.log("Error: %s", result.responseJSON.error);
      }
    });

    e.preventDefault();
  });
});
