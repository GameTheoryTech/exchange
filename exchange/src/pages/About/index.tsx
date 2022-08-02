import Container from 'components/Container'
import { Text, Button, Card, CardBody } from '@gametheory/uikit';
import Wrapper, { Grid, GridItem } from 'components/Grid'
import styled from 'styled-components'
import {PageTitle} from 'components/PageHeader'
import { Link } from 'react-router-dom'
import {Svg} from '@gametheory/uikit';

const StyledParagraph = styled(Text)`
margin-top: 20px;
margin-bottom: 100px;
text-align: center;

&:last-child {
    margin-bottom: 0px;
}
`;

const StyledLink = styled.a`
display: inline-flex;
font-size: 40px;
color: var(--accent);
margin-right: 20px;
transition: all .2s ease-in-out;

&:last-child {
    margin-right: 0px;
}

&:hover {
    opacity: .5;
}

svg {
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentcolor;
}
`;


const Play = () => {
    return (
        <Container>
            <Wrapper>
                <PageTitle className="textGlow pink">
                Game Theory Documentation
                </PageTitle>
                <StyledParagraph>
                All the documentation for the Game Theory protocol can be <a href="https://docs.gametheory.tech/" target="_blank" style={{color:'var(--accent)',textDecoration: 'underline'}}>viewed here</a>.
                </StyledParagraph>

                <PageTitle id="community" className="textGlow pink">
                Join Our Community
                </PageTitle>
                <StyledParagraph>
                Our development and marketing team are actively engaged with our Game Theory community. You can join our discord if you’d like to connect with us, ask us a question or provide feedback. You can also check out our Twitter and YouTube channel for regular updates.
                <div style={{marginTop: '20px'}}>
                <StyledLink
                    href="https://twitter.com/GameTheoryTech"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></Svg>
                  </StyledLink>
                  <StyledLink
                    href="https://www.youtube.com/channel/UCsttAlG8MNA6Fi01QYxhmIg"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Svg viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path></Svg>
                  </StyledLink>
                  <StyledLink href="https://discord.gg/DVc27ub3D8" rel="noopener noreferrer" target="_blank">
                    <Svg viewBox="0 0 26.25 20">
                        <path id="discord" d="M48.256,33.688a.067.067,0,0,0-.034-.031A21.655,21.655,0,0,0,42.879,32a.081.081,0,0,0-.086.041,15.063,15.063,0,0,0-.665,1.366,19.994,19.994,0,0,0-6,0,13.82,13.82,0,0,0-.676-1.366A.084.084,0,0,0,35.365,32a21.594,21.594,0,0,0-5.343,1.657.076.076,0,0,0-.035.03,22.138,22.138,0,0,0-3.878,14.935.09.09,0,0,0,.034.061A21.771,21.771,0,0,0,32.7,52a.085.085,0,0,0,.092-.03,15.545,15.545,0,0,0,1.341-2.18.083.083,0,0,0-.045-.116,14.338,14.338,0,0,1-2.048-.976.084.084,0,0,1-.008-.14c.138-.1.275-.21.407-.319a.081.081,0,0,1,.085-.011,15.529,15.529,0,0,0,13.192,0,.081.081,0,0,1,.086.01c.131.108.269.217.408.32a.084.084,0,0,1-.007.14,13.456,13.456,0,0,1-2.049.975.084.084,0,0,0-.045.117,17.459,17.459,0,0,0,1.34,2.179.083.083,0,0,0,.092.031A21.7,21.7,0,0,0,52.1,48.684a.084.084,0,0,0,.034-.06A21.992,21.992,0,0,0,48.256,33.688ZM34.772,45.641a2.662,2.662,0,0,1,0-5.289,2.662,2.662,0,0,1,0,5.289Zm8.722,0a2.662,2.662,0,0,1,0-5.289,2.662,2.662,0,0,1,0,5.289Z" transform="translate(-26 -31.999)" fill="currentColor"/>
                    </Svg>
                  </StyledLink>
                </div>
                </StyledParagraph>

                <PageTitle id="walletAddresses" className="textGlow pink">
                Wallet Addresses
                </PageTitle>
                <StyledParagraph>
                    <div style={{marginBottom: '40px'}}>
                        We believe in transparency. All protocol wallets can be viewed below.
                    </div>
                    <Button as="a" href="https://snowtrace.io/address/0x148988f296b5B8B8e619434546A4C674397777dd" target="_blank" rel="noopener noreferrer">Treasury Wallet</Button>
                </StyledParagraph>
            </Wrapper>
        </Container>
    )
}

export default Play;