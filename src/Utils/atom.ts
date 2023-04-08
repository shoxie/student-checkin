import { atom } from "jotai";
import { User } from "./interface";

export const userAtom = atom<User>({
    name: "John",
    className: "MTCL2022",
    email: "example@email.com"
});

export const sidebarWidthAtom = atom(0);