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
                monday: [
                    {
                        id: 1,
                        name: "Custom Event 1",
                        type: "custom",
                        startTime: new Date("2018-02-23T11:30:00"),
                        endTime: new Date("2018-02-23T13:30:00"),
                    },
                ],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
            }}
            style={{ height: '500px' }}
            getDayLabel={ev => console.log(ev)}
        />
    )
}