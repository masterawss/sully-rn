import { Box, HStack, Image, Text } from "native-base"
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack"


interface IWItem extends InterfaceHStackProps{
  avatar    : JSX.Element | null
  title     : string | null
  subtitle? : string | null
  actions?  : JSX.Element[] | JSX.Element | null
}

export const WItem = ({
  avatar = null, 
  title, 
  subtitle=null, 
  actions = null, 
  ...props
}: IWItem) => {
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