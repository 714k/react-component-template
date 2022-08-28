
function convertToPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, "").toUpperCase());
}

module.exports = {
  convertToPascalCase
}