import { Box, Button, Divider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import UserContainer from "./UserContainer";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { sidebarWidthAtom, userAtom } from "@/Utils/atom";
import { IoIdCard } from 'react-icons/io5'
import { AiOutlineSchedule } from 'react-icons/ai'
import Link from "next/link";
import { BsDisplay, BsFillBellFill, BsJournalText } from "react-icons/bs";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const navigation = [
    {
        name: "Điểm danh",
        href: "/tool/checkin",
        icon: IoIdCard,
        role: "student"
    },
    {
        name: "Thời khóa biểu",
        href: "/tool/schedule",
        icon: AiOutlineSchedule,
        role: "student"
    },
    {
        name: "Bài giảng",
        href: "/tool/lesson",
        icon: BsJournalText,
        role: "student"
    },
    {
        name: "Danh sách bài nộp",
        href: "/tool/assignments",
        icon: BsDisplay,
        role: "teacher"
    },
    {
        name: "Thông báo",
        href: "/tool/notification",
        icon: BsFillBellFill,
        role: "student"
    },
]

export default function Sidebar() {
    const [, setSidebarWidth] = useAtom(sidebarWidthAtom)
    const [user] = useAtom(userAtom)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(sidebarRef.current.offsetWidth)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarRef.current])

    const logout = () => {
        Cookies.remove("user")
        router.reload()
    }

    const checkRole = (targetRole: string) => {
        if (!user) return false;
        if (user.role === "teacher") {
            return true
        } else if (user.role === targetRole){
            return true
        }
        return false
    }

    return (
        <Box minH={"100vh"} minW={"xs"} ref={sidebarRef} px="1" py="10" bg="gray.100">
            <UserContainer />
            <Divider size="4" />
            <VStack mt="10">
                {navigation.map((item) => (
                    <>
                        {
                            checkRole(item.role) && (<Link key={item.name} href={item.href} style={{
                                width: "80%"
                            }}>
                                <HStack p="2" cursor="pointer" _hover={{ bg: "gray.200" }} rounded={"md"} minW={"80%"} justify="start">
                                    <Icon as={item.icon} boxSize="8" />
                                    <Text>{item.name}</Text>
                                </HStack>
                            </Link>)
                        }
                    </>
                ))}
                <Button onClick={logout}>Đăng xuất</Button>
            </VStack>
        </Box>
    )
}