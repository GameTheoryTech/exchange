"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMockIntersectionObserver = exports.renderWithTheme = void 0;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var styled_components_1 = require("styled-components");
var theme_1 = require("./theme");
/* eslint-disable import/prefer-default-export */
var renderWithTheme = function (component, theme) {
    if (theme === void 0) { theme = theme_1.light; }
    return react_2.render(<styled_components_1.ThemeProvider theme={theme}>{component}</styled_components_1.ThemeProvider>);
};
exports.renderWithTheme = renderWithTheme;
var setupMockIntersectionObserver = function () {
    /* eslint-disable class-methods-use-this */
    var MockIntersectionObserver = /** @class */ (function () {
        function MockIntersectionObserver() {
            this.root = null;
            this.rootMargin = "";
            this.thresholds = [];
        }
        MockIntersectionObserver.prototype.disconnect = function () {
            return jest.fn;
        };
        MockIntersectionObserver.prototype.observe = function () {
            return jest.fn;
        };
        MockIntersectionObserver.prototype.takeRecords = function () {
            return [];
        };
        MockIntersectionObserver.prototype.unobserve = function () {
            return jest.fn;
        };
        return MockIntersectionObserver;
    }());
    Object.defineProperty(window, "IntersectionObserver", {
        writable: true,
        configurable: true,
        value: MockIntersectionObserver,
    });
};
exports.setupMockIntersectionObserver = setupMockIntersectionObserver;
