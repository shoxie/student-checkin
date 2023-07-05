import TimeTableContainer from "@/Components/Timetable"
import { userAtom } from "@/Utils/atom"
import { Heading, VStack, HStack } from "@chakra-ui/react"
import axios from "axios"
import { format } from "date-fns"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export default function Schedule() {
    const [notis, setNotis] = useState<any>([])
    const [user] = useAtom(userAtom)

    useEffect(() => {
        if (!user) return
        axios.get(`/api/user/getAllNoti?userId=${user?.id}`).then((res) => {
            console.log(res.data)
            setNotis(res.data)
        })
    }, [user])

    return (
        <VStack justify="center" w={"full"} spacing={5}>
            <Heading bgColor="gray.200" textTransform={"uppercase"} p={2} rounded="md">Thông báo</Heading>
            {
                notis.map((item: any, idx: number) => (
                    <HStack key={idx} w="full" justify="between">
                        <span>{format(item.createdAt, "HH:mm:ss dd/LL/yyyy")}</span>
                        <span>{item.message}</span>
                    </HStack>
                ))
            }
        </VStack>
    )
}