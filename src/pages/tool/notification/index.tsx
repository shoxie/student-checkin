import TimeTableContainer from "@/Components/Timetable"
import { Heading, VStack } from "@chakra-ui/react"

const data = {
    "thứ 2": [
        {
            id: 1,
            name: "Custom Event 1",
            type: "custom",
            startTime: new Date("2018-02-23T11:30:00"),
            endTime: new Date("2018-02-23T13:30:00"),
        },
    ],
    "thứ 3": [],
    "thứ 4": [],
    "thứ 5": [],
    "thứ 6": [],
    "thứ 7": [],
}

export default function Schedule() {
    if (typeof window === "undefined") return null
    return (
        <VStack justify="center" w={"full"} spacing={5}>
            <Heading bgColor="gray.200" textTransform={"uppercase"} p={2} rounded="md">Thông báo</Heading>
        </VStack>
    )
}