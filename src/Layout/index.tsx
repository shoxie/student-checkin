import { Box, HStack } from "@chakra-ui/react";
import NotificationContainer from "@/Components/Notification";
import { LayoutProps } from "@/Utils/interface";
import Sidebar from "./Components/Sidebar";
import { useAtom } from "jotai";
import { sidebarWidthAtom } from "@/Utils/atom"; 
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function SignInLayout({ children }: LayoutProps) {
    const [sidebarWidth] = useAtom(sidebarWidthAtom);
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        let user = Cookies.get('user')
        setIsSignedIn(!!user)
    })

    return (
        <>
            <Box position="fixed" right="10" top="20" zIndex="100">
                <NotificationContainer />
            </Box>
            <HStack align="start">
                { isSignedIn && <Sidebar />}
                <Box as="main" p="5" style={{
                    width: isSignedIn ? `calc(100% - ${sidebarWidth}px)` : "100%",
                }}>{children}</Box>
            </HStack>
        </>
    );
}