import { Box, HStack, Heading, Icon, Image, Text, VStack } from '@chakra-ui/react'
import CardSwipe from '../../../../public/images/card-swipe.svg'
import { AiOutlineCheck } from 'react-icons/ai'
import { useAtom } from 'jotai'
import { classesAtom, userAtom } from '@/Utils/atom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format, isDate } from 'date-fns'
import { Class } from '@/Utils/type';
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
  const [att, setAtt] = useState([])

  useEffect(() => {
    axios.get(`/api/user/attendances?userId=${user?.id}`).then(result => setAtt(result.data))

  }, [])

  function test() {
    // axios.post("/api/user/checkin", {
    //   uid: "b99770aa"
    // })
    axios.get(`/api/user/attendances?userId=${user?.id}`).then(result => console.log(result.data))
    // axios.get(`/api/classes/getAll?userId=${user?.id}`).then(result => console.log(result.data))
  }

  function getCurrentDate(): string {
    const currentDate = new Date();
    if (!isDate(currentDate)) {
      return ''; // Return an empty string if the current date is invalid
    }
    return format(currentDate, 'dd-MM-yyyy');
  }

  function isCheckedIn(cls: Class) {
    let isChecked = false;
    att.forEach((item: any) => {
      if (item.class.id === cls.id) {
        isChecked = true
      }
    })
    return isChecked
  }

  return (
    <VStack justify={"center"}>
      <Heading bgColor="gray.200" textTransform={"uppercase"} p={2} rounded="md">Điểm danh bằng thẻ</Heading>
      <Image src={CardSwipe.src} alt="CardSwipe" onClick={test} />
      <Box minW={"60%"} border="1px" borderColor={"gray.400"}>
        <Box bg="gray.200" py="3" px="5">
          <Text>Ngày: {getCurrentDate()}</Text>
        </Box>
        <VStack minW="full" py="5">
          {classes.map((item) => (
            <HStack key={item.name}>
              <Box w="auto">
                <Text>{item.name}</Text>
              </Box>
              <HStack spacing="10">
                {/* {item.checkin.map((checkin, idx) => (
                <Box key={idx} w={10} h={10} border={"2px"} borderColor={"red.900"}>
                  {checkin.checked && <AiOutlineCheck />}
                </Box>
              ))} */}
                <Box key={item.id} w={10} h={10} border={"2px"} borderColor={"gray.400"}>
                  {isCheckedIn(item) && (
                    <Icon as={AiOutlineCheck} boxSize={10} color="green.200" />
                  )}
                </Box>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  )
}
