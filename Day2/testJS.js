// let age = 30;  //age is a number
// console.log(typeof(age));
// age = "Thirty"
// console.log(typeof(age));
// console.log(age);
let num1 = "8";
let num2 = 4;
let result = num1 + num2;
console.log(result);

//  give the code to each word count with sample sentenc to test
let sentence = "Hey do you have soups, soups like chicken thai, chicken manchuri";
let words = sentence.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
let wordFrequency = {};

words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
});

console.log("Word frequencies:", wordFrequency);
