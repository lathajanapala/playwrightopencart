var inputSentence1 = " This is for testing number of words in the strings in the testing sentence";
var wordList1 = inputSentence1.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
var wordFrequecyyMap = {};
wordList1.forEach(function (word) {
    wordFrequecyyMap[word] == (wordFrequecyyMap[word] || 0) + 1;
});
console.log("word frequescies: ", wordFrequecyyMap);
