import React from "react";
import styled from 'styled-components';
import { Svg, Text, Link } from '@gametheory/uikit'

interface FooterProps {
    
}

const StyledFooter = styled.footer`
color: var(--accent);
width: 100%;
bottom: 0;
position: absolute;
padding-top: 15px;
padding-bottom: 15px;
background-color: rgba(255,255,255,.05);
z-index: 1;

a {
    color: var(--accent);
    width: 24px;
    height: 24px;
    display: inline;
    margin-left: 20px;
    transition: all .2s ease-in-out;

    &:hover {
        opacity: .5;
    }

    svg {
        font-size: 24px;
        fill: currentColor;
        width: 1em;
        height: 1em;
    }
}
`

const StyledFooterInner = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

  @media (min-width: 1200px) {
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div:last-child {
        margin-top: 10px;
    }
}
`;
  

const Footer: React.FC<FooterProps> = () => {

    return (
        <StyledFooter>
            <StyledFooterInner>
                <Text color="var(--accent)">
                    © {new Date().getFullYear()} Game Theory
                </Text>
                <div>

                <a
                    href="https://twitter.com/GameTheoryTech"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></Svg>
                </a>
                <a
                    href="https://www.youtube.com/channel/UCsttAlG8MNA6Fi01QYxhmIg"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                        <Svg viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path></Svg>
                </a>
                <a href="https://discord.gg/DVc27ub3D8" rel="noopener noreferrer" target="_blank">
                    <Svg viewBox="0 0 26.25 20">
                        <path id="discord" d="M48.256,33.688a.067.067,0,0,0-.034-.031A21.655,21.655,0,0,0,42.879,32a.081.081,0,0,0-.086.041,15.063,15.063,0,0,0-.665,1.366,19.994,19.994,0,0,0-6,0,13.82,13.82,0,0,0-.676-1.366A.084.084,0,0,0,35.365,32a21.594,21.594,0,0,0-5.343,1.657.076.076,0,0,0-.035.03,22.138,22.138,0,0,0-3.878,14.935.09.09,0,0,0,.034.061A21.771,21.771,0,0,0,32.7,52a.085.085,0,0,0,.092-.03,15.545,15.545,0,0,0,1.341-2.18.083.083,0,0,0-.045-.116,14.338,14.338,0,0,1-2.048-.976.084.084,0,0,1-.008-.14c.138-.1.275-.21.407-.319a.081.081,0,0,1,.085-.011,15.529,15.529,0,0,0,13.192,0,.081.081,0,0,1,.086.01c.131.108.269.217.408.32a.084.084,0,0,1-.007.14,13.456,13.456,0,0,1-2.049.975.084.084,0,0,0-.045.117,17.459,17.459,0,0,0,1.34,2.179.083.083,0,0,0,.092.031A21.7,21.7,0,0,0,52.1,48.684a.084.084,0,0,0,.034-.06A21.992,21.992,0,0,0,48.256,33.688ZM34.772,45.641a2.662,2.662,0,0,1,0-5.289,2.662,2.662,0,0,1,0,5.289Zm8.722,0a2.662,2.662,0,0,1,0-5.289,2.662,2.662,0,0,1,0,5.289Z" transform="translate(-26 -31.999)" fill="currentColor"/>
                    </Svg>
                </a>
                <a href="https://gametheorytech.medium.com" rel="noopener noreferrer" target="_blank">
                    <Svg viewBox="0 0 20 20">
                        <path id="rect62" d="M0,0V20H20V0ZM3.349,4.513h3.9l3.011,6.6,2.647-6.6h3.713v.226L15.543,5.767a.313.313,0,0,0-.119.3v7.556a.314.314,0,0,0,.119.3l1.048,1.028v.226H11.321v-.226L12.406,13.9c.107-.107.107-.138.107-.3V7.491L9.5,15.154H9.088L5.576,7.491v5.136a.709.709,0,0,0,.195.589l1.411,1.712v.226h-4v-.226l1.411-1.712a.683.683,0,0,0,.182-.589V6.689A.52.52,0,0,0,4.6,6.25L3.349,4.739Z" fill="#ff0ddf"/>
                    </Svg>
                </a>
                <a
                    href="https://github.com/GameTheoryTech"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Svg viewBox="0 0 24 24"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path></Svg>
                </a>
                </div>
            </StyledFooterInner>
        </StyledFooter>
    );

}

export default Footer;