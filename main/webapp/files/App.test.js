'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@testing-library/react');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders learn react link', function () {
  var _render = (0, _react3.render)(_react2.default.createElement(_App2.default, null)),
      getByText = _render.getByText;

  var linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});