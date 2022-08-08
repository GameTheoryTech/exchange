import Container from 'components/Container'
import { Text, Button, Card, CardBody } from '@gametheory/uikit';
import Wrapper, { Grid, GridItem } from 'components/Grid'
import styled from 'styled-components'
import {PageTitle} from 'components/PageHeader'
import { Link } from 'react-router-dom'

const StyledSubtitle = styled(Text)`
    font-size: 20px;
    padding-bottom: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const CardImage = styled.div`
position: relative;
width: 100%;
padding-bottom: calc(100% / (7/8));

img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    object-fit: cover;
}
`;

const CardTitle = styled(Text)`
    font-size: 20px;
    font-family: "kallisto",sans-serif;
    font-weight: 700;
    text-Shadow: 0px 0px 20px #fff;
`;

const StyledGridItem = styled(GridItem)`
    @media (max-width: 767px) {
        flex-basis: 50%;
        max-width: 50%;
    }
`;

const Play = () => {
    return (
        <Container>
            <Wrapper>
                <PageTitle className="textGlow pink">
                    Game Library
                </PageTitle>
                <Text textAlign={'center'} marginBottom="40px">
                    All our current and future games will utilize the GAME token.
                </Text>
                <StyledSubtitle>
                    Latest Releases
                </StyledSubtitle>
                <Grid style={{justifyContent: 'initial'}}>
                    <StyledGridItem width="sm">
                        <Card className="link">
                            <Link to="/altergene">
                                <CardImage>
                                    <img src="/images/altergene-poster.jpg" />
                                </CardImage>
                                <CardBody>
                                    <CardTitle>
                                        Altergene
                                    </CardTitle>
                                    <Text className="textGlow">
                                        Arcade
                                    </Text>
                                </CardBody>
                            </Link>
                        </Card>
                    </StyledGridItem>
                </Grid>
            </Wrapper>
        </Container>
    )
}

export default Play;