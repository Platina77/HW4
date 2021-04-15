let result = document.getElementById('dialogue');

document.getElementById('doubleQuotes').addEventListener('click', () => {
  result.textContent = result.textContent.replace(/\'/g, '\"');
})

document.getElementById('doubleQuotesAndApostrophe').addEventListener('click', () => {
  result.textContent = result.textContent.replace(/\B'|'\B/g, '"');
})
