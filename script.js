// Arrays of characters to be included in the password
var specialCharacters = "@%+\\/'!#$^?:,)(}{][~\\-_.";
var numericCharacters = "0123456789";
var lowerCasedCharacters = "abcdefghijklmnopqrstuvwxyz";
var upperCasedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt("Enter the length of your password (between 10 and 64 characters):"));

  // Validate the length input
  while (isNaN(length) || length < 10 || length > 64) {
    alert("Please enter a valid number between 10 and 64.");
    length = parseInt(prompt("Enter the length of your password (between 10 and 64 characters):"));
  }

  var includeSpecial = confirm("Include special characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");

  // Validate that at least one character type is selected
  while (!(includeSpecial || includeNumeric || includeLowercase || includeUppercase)) {
    alert("At least one character type should be selected.");
    includeSpecial = confirm("Include special characters?");
    includeNumeric = confirm("Include numeric characters?");
    includeLowercase = confirm("Include lowercase characters?");
    includeUppercase = confirm("Include uppercase characters?");
  }

  return {
    length: length,
    special: includeSpecial,
    numeric: includeNumeric,
    lowercase: includeLowercase,
    uppercase: includeUppercase
  };
}

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  if (!options) return null;

  var availableCharacters = "";
  var password = "";

  if (options.special) availableCharacters += specialCharacters;
  if (options.numeric) availableCharacters += numericCharacters;
  if (options.lowercase) availableCharacters += lowerCasedCharacters;
  if (options.uppercase) availableCharacters += upperCasedCharacters;

  for (var i = 0; i < options.length; i++) {
    var randomIndex = getRandomNumber(0, availableCharacters.length - 1);
    password += availableCharacters.charAt(randomIndex);
  }

  return password;
}

// Get references to the HTML elements
var generateBtn = document.querySelector('#generate');
var passwordText = document.querySelector('#password');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password) {
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
