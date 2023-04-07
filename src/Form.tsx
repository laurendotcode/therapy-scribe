import { TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { db } from "./firebase"
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export function Form() {
    const [allDocs, setAllDocs] = useState<string[]>([])
    const form = useForm({
        initialValues: {
            name: ''
        }
    })

    const name = form.getInputProps('name').value
    const MRN = form.getInputProps('MRN').value

    const onSubmitHandler = async () => {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "Patients", name), {
            name: name,
            MRN: MRN,
            age: 13
        });
    }

    /*const deleteMatt = async () => {
        await deleteDoc(doc(db, "Patients", "Matt"));
    }*/

    useEffect(() => {
        async function getAllDocuments() {
            const querySnapshot = await getDocs(collection(db, "Patients"));
            const docsList: string[] = []
            querySnapshot.forEach((doc) => {
                docsList.push(doc.id)
            });
            setAllDocs(docsList)
        }
        getAllDocuments();
    })


    return (
        <div>
            <form onSubmit={form.onSubmit((values) => onSubmitHandler())}>
                <TextInput
                    withAsterisk
                    label="name"
                    placeholder="first name, last name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="MRN"
                    placeholder=""
                    {...form.getInputProps('MRN')}
                />
                <button type="submit">Submit</button>
            </form>
            <button onClick={deleteMatt}>Delete Matt</button>
            <ol>
                {allDocs.map((doc: string) => <li>{doc}</li>)}
            </ol>
        </div>

    )
}