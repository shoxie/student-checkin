import Avatar, { genConfig } from 'react-nice-avatar'
import { useAtom } from 'jotai'
import { userAtom } from '@/Utils/atom'
import { Text, VStack } from '@chakra-ui/react'

const UserContainer = () => {
    const [user] = useAtom(userAtom)
    const config = genConfig(user?.email || 'User')

    return (
        <VStack>
            <Avatar style={{ width: '8rem', height: '8rem' }}  {...config} />
            <VStack bg="green.200" minW={"60%"} rounded="md" spacing="1" py="1">
                <Text>{user?.name}</Text>
                <Text>{user?.uid}</Text>
            </VStack>
        </VStack>
    )
}

export default UserContainer