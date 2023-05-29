import TimeTableContainer from "@/Components/Timetable"
import { classesAtom } from "@/Utils/atom"
import { parseTimeStringToDate } from "@/Utils/date"
import { Class } from "@/Utils/type"
import { Heading, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

const data = {
    "thứ 2": [
        {
            id: 1,
            name: "Custom Event 1<br/>Cu",
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
    const [timetable, setTimetable] = useState<Class[]>([])
    const [classData] = useAtom(classesAtom)

    useEffect(() => {
        const classes: any = {
        }
        classData.map((item: Class) => {
            const startTime = parseTimeStringToDate(item.startTime, item.day)
            const endTime = parseTimeStringToDate(item.endTime, item.day)
            switch (item.day) {
                case 1:
                    classes["thứ 2"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;
                case 2:
                    classes["thứ 3"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;
                case 3:
                    classes["thứ 4"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;
                case 4:
                    classes["thứ 5"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;
                case 5:
                    classes["thứ 6"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;
                case 6:
                    classes["thứ 7"].push({ ...item, name: `${item.name}</br>${item.subject}`, type: "custom" })
                    break;

                default:
                    classes["cn"].push({ ...item, startTime, endTime, name: `${item.name}</br>${item.subject}` })
                    break;

            }
        })
        setTimetable(classes)
    }, [classData])

    if (typeof window === "undefined") return null
    return (
        <VStack justify="center" w={"full"} spacing={5}>
            <Heading bgColor="gray.200" textTransform={"uppercase"} p={2} rounded="md">Thời khóa biểu</Heading>
            <TimeTableContainer data={timetable} />
        </VStack>
    )
}