import { atom } from "jotai";

export const selectedPatientsAtom = atom<string[]>([]);

export const selectedPatientAtom = atom<string | null>(null);
