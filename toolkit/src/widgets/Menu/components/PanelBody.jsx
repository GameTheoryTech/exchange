"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var react_router_dom_1 = require("react-router-dom");
var IconModule = require("../icons");
var Accordion_1 = require("./Accordion");
var MenuEntry_1 = require("./MenuEntry");
var MenuLink_1 = require("./MenuLink");
var Icons = IconModule;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  height: 100%;\n"])));
var PanelBody = function (_a) {
    var isPushed = _a.isPushed, pushNav = _a.pushNav, isMobile = _a.isMobile, links = _a.links;
    var location = react_router_dom_1.useLocation();
    // Close the menu when a user clicks a link on mobile
    var handleClick = isMobile ? function () { return pushNav(false); } : undefined;
    return (<Container>
      {links.map(function (entry) {
            var Icon = Icons[entry.icon];
            var iconElement = <Icon width="24px" mr="8px"/>;
            var calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
            if (entry.items) {
                var itemsMatchIndex = entry.items.findIndex(function (item) { return item.href === location.pathname; });
                var initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;
                return (<Accordion_1.default key={entry.label} isPushed={isPushed} pushNav={pushNav} icon={iconElement} label={entry.label} status={entry.status} initialOpenState={initialOpenState} className={calloutClass} isActive={entry.items.some(function (item) { return item.href === location.pathname; })}>
              {isPushed &&
                        entry.items.map(function (item) { return (<MenuEntry_1.MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink_1.default href={item.href}>
                      <MenuEntry_1.LinkLabel isPushed={isPushed}>{item.label}</MenuEntry_1.LinkLabel>
                      {item.status && (<MenuEntry_1.LinkStatus color={item.status.color} fontSize="14px">
                          {item.status.text}
                        </MenuEntry_1.LinkStatus>)}
                    </MenuLink_1.default>
                  </MenuEntry_1.MenuEntry>); })}
            </Accordion_1.default>);
            }
            return (<MenuEntry_1.MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink_1.default href={entry.href} onClick={handleClick}>
              {iconElement}
              <MenuEntry_1.LinkLabel isPushed={isPushed}>{entry.label}</MenuEntry_1.LinkLabel>
              {entry.status && (<MenuEntry_1.LinkStatus color={entry.status.color} fontSize="14px">
                  {entry.status.text}
                </MenuEntry_1.LinkStatus>)}
            </MenuLink_1.default>
          </MenuEntry_1.MenuEntry>);
        })}
    </Container>);
};
exports.default = PanelBody;
var templateObject_1;
