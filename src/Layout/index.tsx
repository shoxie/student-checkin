import { Box, HStack } from "@chakra-ui/react";
import NotificationContainer from "@/Components/Notification";
import { LayoutProps } from "@/Utils/interface";
import Sidebar from "./Components/Sidebar";
import { useAtom } from "jotai";
import { classesAtom, sidebarWidthAtom, userAtom } from "@/Utils/atom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import firebase_app from "@/Utils/firebase";
import axios from "axios";

const database = getDatabase(firebase_app);

export default function SignInLayout({ children }: LayoutProps) {
    const [sidebarWidth] = useAtom(sidebarWidthAtom);
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [snapshots, loading, error] = useList(ref(database, 'students'));
    const [, setClasses] = useAtom(classesAtom)
    const [user, setUser] = useAtom(userAtom)
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
        let user = Cookies.get('user')
        setIsSignedIn(!!user)
        if (user) {
            setUser(JSON.parse(user))
            axios.get(`/api/classes/getAll?userId=${JSON.parse(user).id}`).then(result => {
                setClasses(result.data ?? [])
            })
        }
    }, [])

    useEffect(() => {
        snapshots?.map(item => {
            // console.log()
            if (isInitial) {
                setIsInitial(false);
                return
            }
            axios.post("/api/user/checkin", {
                ...item.val()
            })
        })

    }, [snapshots])


    return (
        <>
            <Box position="fixed" right="10" top="20" zIndex="100">
                <NotificationContainer />
            </Box>
            <HStack align="start">
                {isSignedIn && <Sidebar />}
                <Box as="main" p="5" style={{
                    width: isSignedIn ? `calc(100% - ${sidebarWidth}px)` : "100%",
                    height: "auto"
                }}>{children}</Box>
            </HStack>
        </>
    );
}