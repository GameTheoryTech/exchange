import styled from 'styled-components'

const Card = styled.div<any>`
  width: 100%;
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  background-color: rgba(0,0,0,0.4);
`

export const GreyCard = styled(Card)`
  background-color: rgba(0,0,0,0.4);
`
