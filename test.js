// // 📋 Validation Rules:
// // username is required and must be 3–20 characters.
// // email is required and must follow a valid email format.
// // password must:
// // Be at least 8 characters
// // Contain at least one uppercase letter
// // Contain at least one number
// // age is optional but if provided, must be a number ≥ 18.

// //TASK 1

// // const user1 = {
// //   username: 'joe',
// //   email: 'john@example.com',
// //   password: 'MySecret123',
// //   age: 25
// // };

// // function validateUserInput(user) {
// //   let isValid = true;
// //   let errors = [];
// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const hasUppercase = /[A-Z]/;
// //   const hasNumber = /\d/;

// //   if (!user.username || user.username.length > 20 || user.username.length < 3) {
// //     errors.push("Username must be between 3 and 20 characters.");
// //   }
// //   if (!user.email || !emailRegex.test(user.email)) {
// //     errors.push("Invalid email format.");
// //   }
// //   if (!user.password || user.password.length < 8 || !hasUppercase.test(user.password) || !hasNumber.test(user.password)) {
// //     errors.push("Password must be at least 8 characters, with one uppercase and one number.");
// //   }
// //   if (!user.age || user.age <= 18) {
// //     errors.push("Age must be 18 or older");
// //   }
// //   if (errors.length > 0) {
// //     isValid = false;
// //   }
// //   return { isValid, errors };
// // }

// // const result = validateUserInput(user1);
// // console.log(result);


// /*

// You are working on an authentication system and there is a set of rules the users have to follow when picking a new password:
// 1. It has to be at least 16 characters long.
// 2. The password cannot contain the word "password". This rule is not case-sensitive.
// 3. The same character cannot be used more than 4 times. This rule is case-sensitive, "a" and "A" are different characters.
// 4. The password has to contain at least one uppercase and one lowercase letter.
// 5. The password has to contain at least one of the following special characters "*","#","@".

// Write a function that takes in a password and returns a collection of any rule numbers that are not met.
// password_1 = "Strongpwd9999#abc"             ==> []
// password_2 = "Aess10#"                       ==> [1]
// password_3 = "Password@"                     ==> [1,2]
// password_4 = "#PassWord011111112222223x"     ==> [2,3]
// password_5 = "PASSWORDz#1111111"             ==> [2,3]
// password_6 = "aaaapassword$$"                ==> [1,2,3,4,5]
// password_7 = "LESS10#"                       ==> [1,4]
// password_8 = "SsSSSt#passWord"               ==> [1,2]
// password_9 = "SsSSSt#passWordpassword"       ==> [2,3]
// password_10 = "aZ*"                          ==> [1]

// All test cases:
// validate(password_1) ==> []
// validate(password_2) ==> [1]
// validate(password_3) ==> [1,2]
// validate(password_4) ==> [2,3]
// validate(password_5) ==> [2,3]
// validate(password_6) ==> [1,2,3,4,5]
// validate(password_7) ==> [1,4]
// validate(password_8) ==> [1,2]
// validate(password_9) ==> [2,3]
// validate(password_10) ==> [1]
// */


// password_1 = "Strongpwd9999#abc"
// // password_2 = "Aess10#"
// // password_3 = "Password@"
// // password_4 = "#PassWord011111112222223x"
// // password_5 = "PASSWORDz#1111111"
// // password_6 = "aaaapassword$$"
// // password_7 = "LESS10#"
// // password_8 = "SsSSSt#passWord"
// // password_9 = "SsSSSt#passWordpassword"
// // password_10 = "aZ*"

// // validate(password_1)


// // function validate(password) {
// //   let errors = [];
// //   let count = 0;
// //   let result = '';
// //   let regexp4 = /(?=.*[a-z])(?=.*[A-Z])/;
// //   let regexSpecialChar = /[*#@]/;

// //   if (password.length < 16) {
// //     errors.push('password is short');
// //   }
// //   if (password.toLowerCase().includes("password")) {
// //     errors.push("password has password word");
// //   }
// //   const sorted = password.split('').sort();

// //   for (i = 0; password.length > i; i++) {
// //     if (sorted[i] === sorted[i + 1]) {
// //       count++;
// //       if (count >= 4) {
// //         errors.push("repetitive");
// //         break;
// //       }
// //     } else {
// //       count = 1;
// //     }
// //   }
// //   if (!regexp4.test(password)) {
// //     errors.push("one upper and one lower case");
// //   }
// //   if (!regexSpecialChar.test(password)) {
// //     errors.push("should have special chars ");
// //   }
// //   console.log(errors);
// //   return errors;
// // }

// //TASK Find the longest palindrome in a given string.
// // function longestPalingdrom(str) {
// //  let longest = str[0];

// //  function isPalindrom(substr) {
// //   if(substr.split('').reverse().join('') === substr) {
// //     return true;
// //   }
// //   return false;
// //  }

// //  for(i = 0; i < str.length; i++) {
// //   for(j = i; j < str.length; j++) {
// //     let substring = str.slice(i, j + 1)
// //     if(isPalindrom(substring) && substring.length > longest.length) {
// //       longest = substring
// //     }
// //   }
// //  }
// //  return longest;
// // }

// // console.log(longestPalingdrom("sssssssssssssssjjjjbte"));\

// // TASK: Remove all the duplicate characters present in the given string.
// // console.log(remover('banana'));

// // function remover(string) {
// //   let array = [];

// //   for(i = 0; i < string.length; i++) {
// //     if(!array.includes(string[i])) {
// //       array.push(string[i]);
// //     }
// //   }
// //   return array.join('');
// // }

// //TASK Find the sum of digits in a number.

// // console.log(sumDigits(123))
// // function sumDigits(number) {

// //   let flooredNumber = Math.floor(number);
// //   let sum = 0;
// //   let string = flooredNumber.toString();
// //   let array = string.split('');

// //  array.reduce((acc, current) => {
// //   return sum = +acc + +current;
// // }, 0);
// // return sum;
// // }

// //TASK: Given an array of N random two-digit numbers, multiply each number with M and print the last 2 digits of each product. 
// // numberExtract([11,22,45], 33)
// // function numberExtract(array, m) {
// //   let multipliedArray = array.map(num => (num * m).toString());

// //   let newarray = multipliedArray.map(num => num.slice(-2));
// //   return newarray
// // }

// //TASK: Remove the subsequent duplicate characters in a string until you get a unique set of characters.
// //  function remover(str) {
// //   let result = '';

// //   if(typeof str != 'string') {
// //     return `${str} is not a string`
// //   }

// //   for(i=0; i < str.length; i++) {
// // if( str[i] !== str[i + 1]) {
// //   result = result + str[i]
// // }
// //   }
// //   return result
// //  }
// //  console.log(remover(1))


// // ✅ Task Recap
// // Write a function sanitizeInput(input) that:

// // Trims whitespace from both ends

// // Replaces multiple internal spaces with a single space

// // Removes special characters except for . and ,

// // If input is not a string (e.g., null, number), return an empty string

// //  function sanitizer(input) {
// //   if( typeof input != 'string') {
// //     return `${input} is not a string`
// //   }
// //   let trimmed = input.trim();
// //   let withoutDoubleSpaces = trimmed.replace(/\s+/g, ' ')
// //   let cleaned = withoutDoubleSpaces.replace(/[^a-zA-Z0-9., ]/g, '').trim()
// //   console.log(cleaned)
// //   return cleaned
// //  }

// // // sanitizer('  test %^& ')

// //  function tester(input, expected) {
// //   if( sanitizer(input) != expected) {
// //     return `error`
// //   }
// //   return 'things are good'
// //  }

//  console.log(tester('  test %^& ', 'test'))

// Task: Find most frequent element in a list
// IN: [1,4,7,8,4,2,5,7,9,0,4]
// console.log(frequentuer([1,4,7,8,4,2,5,7,9,0,4]))

// function frequentuer(array) {
//   let maxCounter  = 0
//   let currentCounter = 0
//   let element
 
//   let sortedArray  = array.sort()
//  console.log(sortedArray)

//   for(let i = 0; i < sortedArray.length; i++) {
//       if(sortedArray[i] === sortedArray[i +1]) {
//           currentCounter = currentCounter + 1
//           if(currentCounter > maxCounter) {maxCounter = currentCounter; element  = sortedArray[i] }
//       } else {currentCounter = 0}
//   }
//   return element

// }