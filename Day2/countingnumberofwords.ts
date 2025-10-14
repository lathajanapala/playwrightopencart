let inputSentence1 = "This is for testing number of words in the strings in the testing";

let wordList1 = inputSentence1
  .toLowerCase()
  .replace(/[^\w\s]/g, "") // remove punctuation
  .split(/\s+/);           // split by spaces

let wordFrequencyMap1: Record<string, number> = {};

wordList1.forEach(word => {
  wordFrequencyMap1[word] = (wordFrequencyMap1[word] || 0) + 1;
});

console.log("Word frequencies:", wordFrequencyMap1);
