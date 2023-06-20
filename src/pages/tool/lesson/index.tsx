import TimeTableContainer from "@/Components/Timetable"
import { Box, HStack, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react"

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
    if (typeof window === "undefined") return null
    return (
        <Box>
            <SimpleGrid columns={5} spacing={10}>
                {
                    data.map((item: any, idx: number) => (
                        <VStack key={idx}>
                            <Image src={item.image} alt={item.name} w="full" />
                            <Box bg="gray.200" w="full" py="3">
                                <Text align="center">{item.name}</Text>
                            </Box>
                        </VStack>
                    ))
                }
            </SimpleGrid>
        </Box>
    )
}