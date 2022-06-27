import React from 'react'
import {Box, Flex, Text, PancakeToggle, useMatchBreakpoints, Toggle} from '@gametheory/uikit'
import {useExpertModeManager} from 'state/user/hooks'

type ExpertSettingModalProps = {
  translateString?: (translationId: number, fallback: string) => string
}

const ExpertSetting = ({ translateString }: ExpertSettingModalProps) => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [expertMode, toggleSetExpertMode] = useExpertModeManager()

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text bold>Expert</Text>
      </Flex>
      <Box>
        <Toggle scale={isSm || isXs ? 'sm' : 'md'} checked={expertMode} onChange={toggleSetExpertMode} />
      </Box>
    </Box>
  )
}

export default ExpertSetting
