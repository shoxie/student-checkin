import TimeTableContainer from "@/Components/Timetable"
import { Box, HStack, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { format, parseISO } from "date-fns"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Lectures() {
    const [data, setData] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        axios.get("/api/assignments/getAll").then((result: any) => setData(result.data))
    }, [])

    function navigate(id: string) {
        router.push(`/tool/lesson/${id}`)
    }

    if (typeof window === "undefined") return null
    return (
        <Box>
            <Heading>Tất cả bài nộp</Heading>
            <VStack pt="10">
                {
                    data.map((item: any, key: number) => (
                        <HStack key={key} justify={"space-between"} w="full" background={item.isMarked ? "green.400" : "red.400"} px={2} py={1} rounded={"lg"} onClick={() => router.push(`/tool/lesson/${item.classMaterial.id}?studentId=${item.user.id}`)}>
                            <Text>{format(parseISO(item.createdAt), "HH:mm:ss dd/LL/yyyy")} - {item.classMaterial.name}</Text>
                            <Text>{item.user.name}</Text>
                        </HStack>
                    ))
                }
            </VStack>
        </Box>
    )
}