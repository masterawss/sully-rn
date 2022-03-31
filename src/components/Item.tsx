import { Box, HStack, Image, Text } from "native-base"

export const WItem = ({avatar = null, title, subtitle=null, actions = null, ...props}) => {
  return (
    <HStack justifyContent="space-between"  {...props}>
      <HStack>
        {avatar}
        <Box ml={2}>
          {<Text bold>{title}</Text>}
          <Text color="muted.500">{subtitle}</Text>
        </Box>
      </HStack>
      <HStack>
        {actions}
      </HStack>
    </HStack>
  )
}