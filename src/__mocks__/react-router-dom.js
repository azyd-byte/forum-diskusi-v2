const React = require("react");

module.exports = {
  useNavigate: jest.fn(),
  Link: ({ children }) => React.createElement("span", null, children),
};
