import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from "axios"
import { sidebarWidthAtom } from '@/Utils/atom';
import { useAtom } from "jotai";

const LessonDetail = () => {
    const [data, setData] = useState<any>(null)
    const params = useSearchParams()
    const [sidebarWidth] = useAtom(sidebarWidthAtom)

    useEffect(() => {
        const id = params.get("id")
        console.log("id", id)
        if (id) {
            axios.get(`/api/lessons/getById?id=${id}`).then(res => {
                setData({...res.data, image: `/static/${res.data.name.split(".")[0].replace(" ", "")}.png`})
            })
        }
    }, [params])

    if (data === null) {
        return null
    }

    return (
        <Box w="full">
            <object data={`/static/${data.name}`} style={{
                width: "100%",
                height: "100vh"
            }}></object>
        </Box>
    )
}

export default LessonDetail