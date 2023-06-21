import { atom } from "jotai";
import { User } from "./interface";
import { Class } from "./type";

export const userAtom = atom<User | null>(null);

export const sidebarWidthAtom = atom(0);

export const classesAtom = atom<Class[]>([])

export const attAtom = atom<any>([])