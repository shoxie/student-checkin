'use client'

import {
    Box, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import Timetable from 'react-timetable-events'

const data = [

]

export default function Schedule() {
    if (typeof window === "undefined") return null
    return (
        <Timetable
            events={{
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
            }}
            hoursInterval={{
                from: 7,
                to: 18
            }}
            style={{ height: '100vh' }}
            timeLabel=""
        />
    )
}