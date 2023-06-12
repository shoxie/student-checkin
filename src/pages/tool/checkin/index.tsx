import { Box, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import CardSwipe from '../../../../public/images/card-swipe.svg'
import { AiOutlineCheck } from 'react-icons/ai'
import { useAtom } from 'jotai'
import { classesAtom, userAtom } from '@/Utils/atom'
import { useEffect } from 'react'
import axios from 'axios'
const data =
{
  date: '2021-09-01',
  classes: [
    {
      name: 'IT002',
      checkin: [
        {
          date: null,
          checked: false
        },
        {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        },
      ]
    },
    {
      name: 'PH002',
      checkin: [
        {
          date: null,
          checked: false
        },
        {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        },
      ]
    },
    {
      name: 'CE108',
      checkin: [
        {
          date: null,
          checked: false
        },
        {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        }, {
          date: null,
          checked: false
        },
      ]
    },
  ]
}

export default function Home() {
  const [classes] = useAtom(classesAtom)
  const [user] = useAtom(userAtom)

  useEffect(() => {
    console.log("user", user)
  }, [user])

  function test() {
    // axios.post("/api/user/checkin", {
    //   uid: "b99770aa"
    // })
    axios.get(`/api/user/attendances?userId=${user?.id}`)
  }

  return (
    <VStack justify={"center"}>
      <Heading bgColor="gray.200" textTransform={"uppercase"} p={2} rounded="md">Điểm danh bằng thẻ</Heading>
      <Image src={CardSwipe.src} alt="CardSwipe" onClick={test} />
      <Box minW={"60%"} border="1px" borderColor={"gray.400"}>
        <Box bg="gray.200" py="3" px="5">
          <Text>Ngày: {data.date}</Text>
        </Box>
        <VStack minW="full" py="5">
          {data.classes.map((item) => (
            <HStack key={item.name}>
              <Box w="20">
                <Text>{item.name}</Text>
              </Box>
              <HStack spacing="10">
              {item.checkin.map((checkin, idx) => (
                <Box key={idx} w={10} h={10} border={"2px"} borderColor={"red.900"}>
                  {checkin.checked && <AiOutlineCheck />}
                </Box>
              ))}
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>

      <VStack>
        {
          classes.map(item => (
            <Box key={item.id}>{item.name}</Box>
          ))
        }
      </VStack>
    </VStack>
  )
}
