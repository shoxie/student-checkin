import { Box, Button, FormControl, Heading, Icon, Input, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from "axios"
import { sidebarWidthAtom, userAtom } from '@/Utils/atom';
import { useAtom } from "jotai";
import FileUpload from "@/Components/Common/Uploader";
import { useForm } from "react-hook-form";
import { FaUpload } from 'react-icons/fa'
import { useNoti } from "@/context/notification";

type FormValues = {
    file_: FileList
}

const LessonDetail = () => {
    const [data, setData] = useState<any>(null)
    const params = useSearchParams()
    const [sidebarWidth] = useAtom(sidebarWidthAtom)
    const [user] = useAtom(userAtom)
    const [userAssignment, setUserAssignment] = useState<any>()
    const noti = useNoti();
    const [userMark, setUserMark] = useState<number>(0);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const onSubmit = handleSubmit(async (data: any) => {
        if (!user) return
        const file = data.file_[0];
        console.log('On Submit: ', data)
        try {
            const formData = new FormData();
            formData.append('userId', user.id);
            formData.append('classMaterialId', params.get("id") || "");
            formData.append('pdfFile', file);

            const res = await axios.post('/api/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setUserAssignment(res.data.data)
            noti.addNoti("Nộp bài thành công", "Nộp bài thành công", "success", "Đóng", () => { })
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    })


    useEffect(() => {
        const id = params.get("id")
        const studentId = params.get("studentId") ? params.get("studentId") : user?.id
        if (id) {
            axios.get(`/api/lessons/getById?id=${id}`).then(res => {
                setData({ ...res.data, image: `/static/${res.data.name.split(".")[0].replace(" ", "")}.png` })
            })
            axios.get(`/api/user/getAssignment?classMaterialId=${id}&userId=${studentId}`).then(res => {
                console.log('res', res)
                setUserAssignment(res.data)
            })
        }
    }, [params])

    const validateFiles = (value: FileList) => {
        if (value.length < 1) {
            return 'Files is required'
        }
        for (const file of Array.from(value)) {
            const fsMb = file.size / (1024 * 1024)
            const MAX_FILE_SIZE = 10
            if (fsMb > MAX_FILE_SIZE) {
                return 'Max file size 10mb'
            }
        }
        return true
    }

    const sumbitMark = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const mark: number = parseFloat((event.target as HTMLFormElement).mark.value);
        axios.post(`/api/user/markAssignment?id=${userAssignment.id}&score=${mark}`).then(res => {
            noti.addNoti("Chấm điểm thành công", "Chấm điểm thành công", "success", "Đóng", () => { })
        })
    }

    if (data === null) {
        return null
    }

    return (
        <Box w="full">
            <Box>
                <object data={`/static/${data.name}`} style={{
                    width: "100%",
                    height: "100vh"
                }}></object>
            </Box>
            <Box>
                <Heading>Bài nộp</Heading>
                <Box py={5} display={user && user.role === "teacher" ? "none" : "block"}>
                    <Text>Điểm: </Text>
                    <Input value={userAssignment?.score ?? 0} bg={"gray.200"} />
                </Box>
                {
                    !userAssignment && (
                        <form onSubmit={onSubmit}>
                            <FormControl isInvalid={!!errors.file_} isRequired>
                                <FileUpload accept={'.pdf'}
                                    multiple={false}
                                    register={register('file_', { validate: validateFiles })}>
                                    <Button type="submit"><Icon as={FaUpload} /></Button>
                                </FileUpload>
                            </FormControl>
                        </form>
                    )
                }
                {!userAssignment && user && user.role !== "teacher" && (<Text>{user?.name} chưa nộp bài</Text>)}
                {
                    userAssignment && (
                        <object data={`/static/${userAssignment.fileName}`} style={{
                            width: "100%",
                            height: "100vh"
                        }}></object>
                    )
                }
                {
                    user && user.role === "teacher" && (
                        <Box pt={5}>
                            <form onSubmit={sumbitMark}>
                                <FormControl display={"flex"} flexDir={"column"} gap={5}>
                                    <Input type="number" value={userMark} name="mark" onChange={(e) => setUserMark(parseFloat(e.target.value))} />
                                    <Button type="submit">Chấm điểm</Button>
                                </FormControl>
                            </form>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default LessonDetail