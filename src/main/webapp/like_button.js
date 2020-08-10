'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var LikeButton = require('./likebutton.js');

var e = React.createElement;

var domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);