import { Box, Divider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import UserContainer from "./UserContainer";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { sidebarWidthAtom } from "@/Utils/atom";
import { IoIdCard } from 'react-icons/io5'
import { AiOutlineSchedule } from 'react-icons/ai'
import Link from "next/link";

const navigation = [
    {
        name: "Điểm danh",
        href: "/tool/checkin",
        icon: IoIdCard,
    },
    {
        name: "Thời khóa biểu",
        href: "/tool/schedule",
        icon: AiOutlineSchedule,
    },
]

export default function Sidebar() {
    const [, setSidebarWidth] = useAtom(sidebarWidthAtom)
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(sidebarRef.current.offsetWidth)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sidebarRef.current])



    return (
        <Box minH={"100vh"} minW={"xs"} ref={sidebarRef} px="1" py="10" bg="gray.100">
            <UserContainer />
            <Divider size="4" />
            <VStack mt="10">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href} style={{
                        width: "80%"
                    }}>
                        <HStack p="2" cursor="pointer" _hover={{ bg: "gray.200" }} rounded={"md"} minW={"80%"} justify="start">
                            <Icon as={item.icon} boxSize="8" />
                            <Text>{item.name}</Text>
                        </HStack>
                    </Link>
                ))}
            </VStack>
        </Box>
    )
}