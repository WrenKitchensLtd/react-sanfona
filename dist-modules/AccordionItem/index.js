'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = require('../Accordion/utils');

var _AccordionItemBody = require('../AccordionItemBody');

var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

var _AccordionItemTitle = require('../AccordionItemTitle');

var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionItem = function (_Component) {
  _inherits(AccordionItem, _Component);

  function AccordionItem(props) {
    _classCallCheck(this, AccordionItem);

    var _this = _possibleConstructorReturn(this, (AccordionItem.__proto__ || Object.getPrototypeOf(AccordionItem)).call(this, props));

    _this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden'
    };
    return _this;
  }

  _createClass(AccordionItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.uuid = this.props.uuid || _uuid2.default.v4();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setMaxHeight();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          children = _props.children,
          disabled = _props.disabled,
          expanded = _props.expanded;


      if (prevProps.expanded !== expanded) {
        if (disabled) return;

        if (expanded) {
          this.handleExpand();
        } else {
          this.handleCollapse();
        }
      } else if (prevProps.children !== children) {
        this.setMaxHeight();
      }
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand() {
      var _props2 = this.props,
          index = _props2.index,
          onExpand = _props2.onExpand,
          slug = _props2.slug;


      this.setMaxHeight();

      if (onExpand) {
        slug ? onExpand(slug, index) : onExpand(index);
      }
    }
  }, {
    key: 'handleCollapse',
    value: function handleCollapse() {
      var _props3 = this.props,
          index = _props3.index,
          onClose = _props3.onClose,
          slug = _props3.slug;


      this.setMaxHeight();

      if (onClose) {
        slug ? onClose(slug, index) : onClose(index);
      }
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight() {
      var _this2 = this;

      var _props4 = this.props,
          duration = _props4.duration,
          expanded = _props4.expanded;


      clearTimeout(this.timeout);

      var bodyNode = _reactDom2.default.findDOMNode(this.refs.body);
      var images = bodyNode.querySelectorAll('img');

      if (images.length > 0) {
        return this.preloadImages(bodyNode, images);
      }

      this.setState({
        maxHeight: expanded ? bodyNode.scrollHeight + 'px' : 0,
        overflow: 'hidden'
      });

      if (expanded) {
        this.timeout = setTimeout(function () {
          _this2.setState({
            overflow: 'visible'
          });
        }, duration);
      }
    }

    // Wait for images to load before calculating maxHeight

  }, {
    key: 'preloadImages',
    value: function preloadImages(node) {
      var _this3 = this;

      var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var expanded = this.props.expanded;


      var imagesLoaded = 0;

      var imgLoaded = function imgLoaded() {
        imagesLoaded++;

        if (imagesLoaded === images.length && _this3.refs.item) {
          _this3.setState({
            maxHeight: expanded ? node.scrollHeight + 'px' : 0,
            overflow: 'hidden'
          });
        }
      };

      for (var i = 0; i < images.length; i += 1) {
        var img = new Image();
        img.src = images[i].src;
        img.onload = img.onerror = imgLoaded;
      }
    }
  }, {
    key: 'propagateMaxHeight',
    value: function propagateMaxHeight() {
      var _this4 = this;

      var children = this.props.children;
      var childrenProps = children && (0, _utils.arrayify)(children).filter(function (c) {
        return c;
      }).map(function (child) {
        return child.props;
      });

      if (!childrenProps) {
        return;
      }

      if (childrenProps.some(function (prop) {
        return String(prop.className).includes('nested-accordion');
      })) {
        this.setState({
          maxHeight: 'none'
        });

        setTimeout(function () {
          if (_this4.refs.body) {
            _this4.setMaxHeight();
          }
        }, this.props.duration);
      }
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      var _props6;

      var _props5 = this.props,
          className = _props5.className,
          disabled = _props5.disabled,
          disabledClassName = _props5.disabledClassName,
          expanded = _props5.expanded,
          expandedClassName = _props5.expandedClassName,
          style = _props5.style;


      var props = (_props6 = {}, _defineProperty(_props6, 'aria-' + (expanded ? 'expanded' : 'hidden'), true), _defineProperty(_props6, 'className', (0, _classnames2.default)('react-sanfona-item', className, {
        'react-sanfona-item-expanded': expanded && !disabled,
        'react-sanfona-item-disabled': disabled
      }, expandedClassName && _defineProperty({}, expandedClassName, expanded), disabledClassName && _defineProperty({}, disabledClassName, disabled))), _defineProperty(_props6, 'role', 'tabpanel'), _defineProperty(_props6, 'style', style), _defineProperty(_props6, 'onClick', this.propagateMaxHeight.bind(this)), _props6);

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          bodyClassName = _props7.bodyClassName,
          bodyTag = _props7.bodyTag,
          children = _props7.children,
          disabled = _props7.disabled,
          duration = _props7.duration,
          easing = _props7.easing,
          onClick = _props7.onClick,
          Root = _props7.rootTag,
          title = _props7.title,
          titleClassName = _props7.titleClassName,
          titleTag = _props7.titleTag;
      var _state = this.state,
          maxHeight = _state.maxHeight,
          overflow = _state.overflow;


      return _react2.default.createElement(
        Root,
        _extends({}, this.getProps(), { ref: 'item' }),
        _react2.default.createElement(_AccordionItemTitle2.default, {
          className: titleClassName,
          onClick: disabled ? null : onClick,
          rootTag: titleTag,
          title: title,
          uuid: this.uuid
        }),
        _react2.default.createElement(
          _AccordionItemBody2.default,
          {
            className: bodyClassName,
            duration: duration,
            easing: easing,
            maxHeight: maxHeight,
            overflow: overflow,
            ref: 'body',
            rootTag: bodyTag,
            uuid: this.uuid
          },
          children
        )
      );
    }
  }]);

  return AccordionItem;
}(_react.Component);

exports.default = AccordionItem;


AccordionItem.defaultProps = {
  rootTag: 'div',
  titleTag: 'h3',
  bodyTag: 'div',
  duration: 300
};

AccordionItem.propTypes = {
  bodyClassName: _propTypes2.default.string,
  bodyTag: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  disabledClassName: _propTypes2.default.string,
  duration: _propTypes2.default.number,
  easing: _propTypes2.default.string,
  expanded: _propTypes2.default.bool,
  expandedClassName: _propTypes2.default.string,
  index: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  rootTag: _propTypes2.default.string,
  slug: _propTypes2.default.string,
  style: _propTypes2.default.object,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  titleClassName: _propTypes2.default.string,
  titleTag: _propTypes2.default.string,
  uuid: _propTypes2.default.string
};