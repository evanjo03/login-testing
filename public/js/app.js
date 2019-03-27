$(document).ready(function () {



    //user login process
    $("#login-submit-button").on("click", function (event) {
        event.preventDefault();

        var username = $("#stored-username").val();
        var password = $("#stored-password").val();
        console.log("Form user:", username, password);
        var loginObject = { username: username, password: password }

        $.ajax({
            method: "POST",
            url: "/password",
            data: loginObject
        }).then(function (result) {
            alert(result);
        })
    })

    //new user sign-up
    $("#new-user-submit-button").on("click", function (event) {
        event.preventDefault();

        //define our new value variables
        var username = $("#new-username").val();
        var password = $("#new-password").val();

        var newUser = {
            username: username,
            password: password,
        };

        $.ajax({
            method: "POST",
            url: "/api/user",
            data: newUser
        }).then(function (result) {
            alert(result);
            location.reload();
        })
    })

    //loads all current users that have accounts
    function loadUsers() {
        $.ajax({
            method: "GET",
            url: "/api/users",
        }).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var html = `<hr><div><h4>Username: `;
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

    //load all users on page startup
    loadUsers();


});
