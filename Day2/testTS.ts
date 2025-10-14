let inputSentence = "Hey do you have soups, soups like chicken thai, chicken manchuri";
let wordList = inputSentence.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
let wordFrequencyMap = {};

wordList.forEach(word => {
    wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
});

console.log("Word frequencies:", wordFrequencyMap);