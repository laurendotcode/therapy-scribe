import { Button, List, TextInput } from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";
import { db } from "./firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useGetNames } from "./useGetNames";

export function Form() {
  const names = useGetNames();
  const initialValues: { name: string; MRN: string } = {
    name: "",
    MRN: "",
  };
  const form = useForm({
    initialValues,
    validate: {
      MRN: isInRange({ min: 18, max: 99 }),
    },
  });

  const onSubmitHandler = async ({ name, MRN }: typeof initialValues) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "Patients", name), {
      name: name,
      MRN: parseInt(MRN),
      age: 13,
    });
  };

  const deletePatient = async (name: string) => {
    await deleteDoc(doc(db, "Patients", name));
  };

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
        <TextInput
          withAsterisk
          label="name"
          placeholder="first name, last name"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="MRN"
          placeholder=""
          {...form.getInputProps("MRN")}
        />
        <Button type="submit">Submit</Button>
      </form>
      <List>
        {names.map((name: string) => (
          <List.Item key={name}>
            {name}
            <Button
              onClick={() => {
                deletePatient(name);
              }}
            >
              Delete
            </Button>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
