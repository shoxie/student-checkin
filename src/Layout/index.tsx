import { Box, HStack } from "@chakra-ui/react";
import NotificationContainer from "@/Components/Notification";
import { LayoutProps } from "@/Utils/interface";
import Sidebar from "./Components/Sidebar";
import { useAtom } from "jotai";
import { attAtom, classesAtom, sidebarWidthAtom, userAtom } from "@/Utils/atom";
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
    const [, setAtt] = useAtom(attAtom)

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
        setIsSignedIn(!!user)
    }, [user])

    useEffect(() => {
        snapshots?.map(item => {
            // console.log()
            if (isInitial) {
                setIsInitial(false);
                return
            }
            const data = item.val().Student_main.split(",")
            const userData = {
                Studentid: data[1],
                uid: data[0],
                name: data[2]
            }

            axios.post("/api/user/checkin", userData).then(() => {
                axios.get(`/api/user/attendances?userId=${user?.id}`).then(result => setAtt(result.data))

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
                    height: "full"
                }}>{children}</Box>
            </HStack>
        </>
    );
}