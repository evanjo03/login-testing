$(document).ready(function () {

function loadUsers() {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).then(function(result) {
    for (var i=0; i<result.length; i++) {
      var html = `<div><h4>Username: `;
      html += result[i].username;
      html += "</h4><h4>Password: ";
      html += result[i].password;
      html += "</h4><h4>Score: ";
      html += result[i].score;
      html += "</h4></div>";
      $("#users").append(html)
    }
  })
}
loadUsers();




    $("#users").append()
    //user login implementation
    $("#login-submit-button").on("click", function (event) {
        event.preventDefault();

        //get a list of all current users in the database
        $.ajax({
            method: "GET",
            url: "/api/users"
        }).then(function (result) {
            //define our new values
            var username = $("#stored-username").val();
            var password = $("#stored-password").val();
            console.log("Form user:", username, password);

            //create var for our current user
            var currentUser;
            var usernameCorrect = false;
            var passwordCorrect = false;

            //loop through each user
            for (var i = 0; i < result.length; i++) {
                console.log("User:", result[i]);
                if (result[i].username === username) {
                    //username exists
                    usernameCorrect = true;
                    if (result[i].password === password) {
                        //password is correct
                        passwordCorrect = true;
                        //user is assigned
                        currentUser = result[i];
                        alert("Correct credentials, user logged in")
                        console.log("Current user:", result[i])
                    }
                }
            }
            if (!(passwordCorrect && usernameCorrect)) {
                alert("Invalid credentials");
            }
        })
    });
    //new user implementation
    $("#new-user-submit-button").on("click", function (event) {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/api/users"
        }).then(function (result) {
            //define our new values
            var username = $("#new-username").val();
            var password = $("#new-password").val();
            var score = 0;
            var isUsernameUnique = true;

            //check to verify there is no username in the db already
            for (var i = 0; i < result.length; i++) {
                if (result[i].username === username) {
                    isUsernameUnique = false;
                    alert("Please enter a new username; that name is taken")
                }
            }

            //set up variable to send to db
            if (isUsernameUnique) {
                var newUser = {
                    username: username,
                    password: password,
                    score: score
                };

                $.ajax({
                    method: "POST",
                    url: "/api/user",
                    data: newUser
                }).then(function (result) {
                    console.log("You added a new user!");
                    location.reload();
                })
            }
        })
    });

});
