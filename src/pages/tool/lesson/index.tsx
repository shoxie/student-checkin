import TimeTableContainer from "@/Components/Timetable"
import { Box, HStack, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const data = [
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
    {
        url: "/",
        name: "Chương 1: lmao",
        image: "https://picsum.photos/250/400"
    },
]

export default function Lectures() {
    const [data, setData] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        axios.get("/api/lessons/getAll").then((result: any) => setData(result.data.map((item: any) => {
            return {...item, img: `/static/${item.name.split(".")[0].replace(" ", "")}.png`}
        })))
    }, [])

    function navigate(id: string) {
        router.push(`/tool/lesson/${id}`)
    }

    if (typeof window === "undefined") return null
    return (
        <Box>
            <SimpleGrid columns={5} spacing={10}>
                {
                    data.map((item: any, idx: number) => (
                        <VStack key={idx} onClick={() => navigate(item.id)}>
                            <Image src={item.img} alt={item.name} w="full" />
                            <Box bg="gray.200" w="full" py="3" minH={20}>
                                <Text align="center">{item.name}</Text>
                            </Box>
                        </VStack>
                    ))
                }
            </SimpleGrid>
        </Box>
    )
}