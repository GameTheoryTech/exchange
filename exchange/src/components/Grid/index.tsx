import styled from 'styled-components'

const Wrapper = styled.div<{ 
    gap?: 'sm' | 'md' | 'lg' | string
  }>`
  width: 100%;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: auto;
  display: block;
  padding-left: 8px;
  padding-right: 4px;
  position: relative;
  
      @media (min-width: 767px) {
          padding-left: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};
          padding-right: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};
      }
  
      @media (min-width: 1200px) {
          max-width: 1200px;
      }
  `;

export const Grid = styled.div<{ 
    gap?: 'sm' | 'md' | 'lg' | string
  }>`
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  margin-top: -${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};
  width: calc(100% + ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'});
  margin-left: -${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};
  justify-content: center;
  `;

const GridItem = styled.div<{
    width?: 'sm' | 'md' | 'lg' | string
    gap?: 'sm' | 'md' | 'lg' | string
    mobile?: boolean
  }>`
  box-sizing: border-box;
  margin: 0px;
  flex-direction: row;
  flex-basis: 100%;
  flex-grow: 0;
  max-width: 100%;
  padding-top: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};
  padding-left: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap || '24px'};


  ${({mobile}) => !mobile && `@media (min-width: 767px) {`}
  flex-basis: ${({ width }) => (width === 'sm' && '25%') || (width === 'md' && '33.33%') || (width === 'lg' && '50%') || width || '100%'};
  max-width: ${({ width }) => (width === 'sm' && '25%') || (width === 'md' && '33.33%') || (width === 'lg' && '50%') || width || '100%'};
  ${({mobile}) => !mobile && `}`}

`;

// default GridItem values
GridItem.defaultProps = {
  width: '100%',
  gap: 'lg',
  mobile: false
};

export {GridItem};

export default Wrapper;