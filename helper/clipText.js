function shortenText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substr(0, maxLength - 3) + "...";
  }
  return text;
}
export default shortenText;
