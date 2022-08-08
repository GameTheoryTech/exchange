import React from 'react'
import styled from 'styled-components'
import { Card } from '@gametheory/uikit'
import {useLocation} from "react-router-dom";

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 375px;
  width: 100%;
  z-index: 5;
`

export const AltergeneBodyWrapper = styled(Card)`
  position: relative;
  width: 100%;
  z-index: 5;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (location.pathname.includes("altergene") ? <AltergeneBodyWrapper>{children}</AltergeneBodyWrapper> : <BodyWrapper>{children}</BodyWrapper>)
}
