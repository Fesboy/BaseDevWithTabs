const fs = require("fs");
const path = require("path");

const withDelay = (func, delay) => (...args) =>
  setTimeout(() => func(...args), delay);

const mockApis = fs
  .readdirSync(path.resolve(__dirname, "../mock"))
  .map(file => require(path.resolve(__dirname, "../mock/" + file)))
  .reduce((prev, module) => Object.assign(prev, module), {});

const mocks = Object.entries(mockApis).map(item => {
  const [method, path] = item[0].split(" ");
  return [method, path, item[1]];
});

function mockProxy(app, delay = 0) {
  mocks.forEach(mock => {
    const [method, path, func] = mock;
    app[method.toLowerCase()](path, withDelay(func, delay));
  });
}

module.exports = {
  mockProxy
};
