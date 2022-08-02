import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, useModal, TuneIcon, HistoryIcon } from '@gametheory/uikit'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const StyledPageHeader = styled.div`
  padding: 24px;
  padding-bottom: 0;
`

const Details = styled.div`
  flex: 1;
  text-align: center;
`

export const PageTitle = styled(Text)`
font-family: "kallisto",sans-serif;
font-weight: 500;
font-size: 40px;
text-align: center;
color: var(--accent);
text-Shadow: 0px 0px 20px var(--accent);

@media (max-width: 767px) {
    font-size: 30px;
}
`;

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {description && (
            <Text color="textSubtle" fontSize="14px">
              {description}
            </Text>
          )}
          {children && <Text mt="16px">{children}</Text>}
        </Details>

      </Flex>
    </StyledPageHeader>
  )
}

export default PageHeader
