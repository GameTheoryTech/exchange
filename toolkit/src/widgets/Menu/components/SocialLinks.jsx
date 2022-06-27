"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Flex_1 = require("../../../components/Box/Flex");
var Dropdown_1 = require("../../../components/Dropdown/Dropdown");
var Link_1 = require("../../../components/Link/Link");
var IconModule = require("../icons");
var config_1 = require("../config");
var Icons = IconModule;
var SocialLinks = function () { return (<Flex_1.default>
    {config_1.socials.map(function (social, index) {
        var Icon = Icons[social.icon];
        var iconProps = { width: "24px", color: "textSubtle", style: { cursor: "pointer" } };
        var mr = index < config_1.socials.length - 1 ? "24px" : 0;
        if (social.items) {
            return (<Dropdown_1.default key={social.label} position="top" target={<Icon {...iconProps} mr={mr}/>}>
            {social.items.map(function (item) { return (<Link_1.default external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                {item.label}
              </Link_1.default>); })}
          </Dropdown_1.default>);
        }
        return (<Link_1.default external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <Icon {...iconProps}/>
        </Link_1.default>);
    })}
  </Flex_1.default>); };
exports.default = react_1.default.memo(SocialLinks, function () { return true; });
