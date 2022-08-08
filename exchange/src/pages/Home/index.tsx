import Container from 'components/Container'
import { Text, Button, Card, CardBody } from '@gametheory/uikit';
import styled from 'styled-components'
import Wrapper, { Grid, GridItem } from 'components/Grid'
import {PageTitle} from 'components/PageHeader'
import { Link } from 'react-router-dom'

const StyledText = styled(Text)`
    font-family: "kallisto",sans-serif;
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 20px;

    @media (max-width: 767px) {
        font-size: 24px;
    }
`;

const StyledCard = styled.div`
text-align: center;
height: 100%;
`;

const StyledImage = styled.img`
display: block;
border-radius: 100%;
box-shadow: 0px 0px 20px 0px var(--extra-color-1);
width: 64px;
height: 64px;
margin: 0px auto;
margin-bottom: 20px;
`;

const StyledParagraph = styled(Text)`
margin-top: 20px;
margin-bottom: 50px;
text-align: center;

&:last-child {
    margin-bottom: 0px;
}
`;

const Home = () => {
    return (
        <Container>
            <Wrapper>
                <PageTitle className="textGlow pink">
                    GAME THEORY
                </PageTitle>
                <Text textAlign="center" fontSize="20px" style={{marginBottom: '50px'}}>
                The Blockchain Gaming Ecosystem Powered by GAME
                </Text>
                <Grid>
                    <GridItem width="375px">
                        <Link to="/play">
                            <StyledCard className='boxed link'>
                                <CardBody>
                                    <StyledImage src="/images/play-icon.png" />
                                    <StyledText>
                                        Play
                                    </StyledText>
                                    <Text className="textGlow">Play Arcade, RPG and Casual Games, powered by the GAME ecosystem. </Text>
                                </CardBody>
                            </StyledCard>
                        </Link>
                    </GridItem>
                    <GridItem width="375px">
                        <Link to="/swap">
                            <StyledCard className='boxed link'>
                                <CardBody>
                                    <StyledImage src="/images/swap-icon.png" />
                                    <StyledText>
                                        Swap
                                    </StyledText>
                                    <Text className="textGlow">Pay less fees when you swap tokens on the AVAX Blockchain using Celestial Exchange.</Text>
                                </CardBody>
                            </StyledCard>
                        </Link>
                    </GridItem>
                    <GridItem width="375px">
                        <Link to="/farms">
                            <StyledCard className='boxed link'>
                                <CardBody>
                                    <StyledImage src="/images/earn-icon.png" />
                                    <StyledText>
                                        Earn
                                    </StyledText>
                                    <Text className="textGlow">Earn passive rewards just by holding GAME. Stake your tokens to earn yield.</Text>
                                </CardBody>
                            </StyledCard>
                        </Link>
                    </GridItem>
                </Grid>
                <PageTitle className="textGlow pink" style={{marginTop: '50px'}}>
                    Games
                </PageTitle>
                <StyledParagraph>
                    Game Theory is merging decentralized finance and gaming. Our ecosystem will include wagering, arcade, strategy and RPG games, all centred around our native currency, "GAME". Our games are engaging, challenging and most of all, fun! They also allow gamers the chance to win money by breaking high scores or completing certain levels, or winning rounds.
                </StyledParagraph>
                <PageTitle className="textGlow pink">
                    Rewards
                </PageTitle>
                <StyledParagraph>
                    GAME token holders can earn rewards passively. Just by holding GAME tokens you automatically earn a share of all protocol profits. If you buy GAME tokens while the price is under $1, you earn additional rewards in USDC, paid to you when the price reaches $1 again.
                </StyledParagraph>
                <PageTitle className="textGlow pink">
                    Decentralized Finance
                </PageTitle>
                <StyledParagraph>
                    Investors have the opportunity to benefit from the growth of the ecosystem by earning staking rewards by supplying tokens to the liquidity pool or by locking LP tokens in the MASTER rewards pool.<br /><br />LP token stakers earn more passive GAME rewards, while MASTER pool token stakers earn considerably more GAME rewards, providing Game Theory investors four ways to earn!
                </StyledParagraph>
            </Wrapper>
        </Container>
    )
}

export default Home;