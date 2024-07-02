function signUp() {
  let fullName = $("#fullName").val();
  let email = $("#email").val();

  if (!fullName || !email) {
    alert("Please fill in all fields.");
    return;
  }

  displayInfo(fullName, email);
}

function displayInfo(fullName, email) {
  let result = $("#result");
  result.html("<h2>Account Created</h2>");
  result.append("<p><strong>Full Name:</strong> " + fullName + "</p>");
  result.append("<p><strong>Email:</strong> " + email + "</p>");
}
