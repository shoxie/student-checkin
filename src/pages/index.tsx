import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Heading, Image, Input, Text, VStack } from "@chakra-ui/react";
import Logo from '../../public/images/logo.png'
import { useNoti } from "@/context/notification";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "@/Utils/atom";
import cookies from "js-cookie"
import axios from "axios";
import { User } from "@/Utils/interface";

const SignIn = () => {
    const noti = useNoti();
    const router = useRouter()
    const [user, setUser] = useAtom(userAtom)

    async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const email = ev.currentTarget.email.value;
        const password = ev.currentTarget.password.value;

        if (!email || !password) {
            noti.addNoti("Đăng nhập lỗi", "Vui lòng nhập đầy đủ thông tin", "error", "Đóng", () => { })
        }

        axios.post<User>("/api/user/signIn", {
            ...user,
            email,
            password
        }).then(result => {
            const user = result.data

            setUser(user)

            cookies.set('user', JSON.stringify(user), { expires: 1 })

            noti.addNoti("Đăng nhập thành công", "Đăng nhập thành công", "success", "Đóng", () => { router.push('/tool/checkin') })

            router.push('/tool/checkin')
        }).catch(err => {
            noti.addNoti("Đăng nhập lỗi", err.message, "error", "Đóng", () => { })

        })
    }

    return (
        <HStack justify="center" h="100vh">
            <Box maxW={"8xl"} border="1px">
                <HStack justify="center" bg="gray.200" p="8">
                    <Image src={Logo.src} alt="CE-Logo" />
                    <Box>
                        <Heading textTransform={"uppercase"} fontWeight={400}>
                            Trường Đại Học Công Nghệ Thông Tin<br />Khoa Kỹ thuật Máy tính
                        </Heading>
                    </Box>
                </HStack>
                <VStack p="5" spacing={5}>
                    <Text textTransform={"uppercase"} fontWeight={"600"} fontSize={"xl"}>Thông tin đăng nhập</Text>
                    <form onSubmit={onSubmit}>
                        <VStack spacing={5} minW={96}>
                            <FormControl>
                                <FormLabel>Tài khoản</FormLabel>
                                <Input type='email' id="email" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input type='password' id="password" />
                            </FormControl>
                            <Button type="submit">Đăng nhập</Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>

            {/* <Button onClick={() => {
                axios.get('/api/hello')
            }}>test</Button> */}
        </HStack>
    )
}

export default SignIn