'use strict';

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(
  React,
  null,
  React.createElement(_App2.default, null)
), document.getElementById('root'));