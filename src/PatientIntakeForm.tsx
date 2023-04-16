import { Button, Center, List, TextInput, rem } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isInRange, useForm } from "@mantine/form";
import { db } from "./firebase";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useGetNames } from "./useGetNames";
import { useState } from "react";

const stringValidator = (value: string, fieldName: string) => {
  if (value.length < 2) {
    return fieldName + " must have at least 2 letters";
  } else if (value.length > 50) {
    return fieldName + " must have fewer than 50 letters";
  }
  return null;
};

export function PatientIntakeForm() {
  const patientsCollection = collection(db, "patients");
  const names = useGetNames();
  const initialValues: {
    firstName: string;
    lastName: string;
    middleName: string;
    MRN: string;
  } = {
    firstName: "",
    middleName: "",
    lastName: "",
    MRN: "",
  };
  const form = useForm({
    initialValues,
    validate: {
      firstName: (value) => stringValidator(value, "First name"),
      middleName: (value) => stringValidator(value, "Middle name"),
      lastName: (value) => stringValidator(value, "Last name"),
      MRN: isInRange({ min: 18, max: 99 }),
    },
  });

  const onSubmitHandler = async ({
    firstName,
    middleName,
    lastName,
    MRN,
  }: typeof initialValues) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "Patients"), {
      firstName,
      middleName,
      lastName,
      MRN: parseInt(MRN),
      age: 13,
    });
  };
  const [birthDate, setBirthDate] = useState<Date | null>(
    new Date(1989, 8, 30)
  );
  const [birthDateSearchResult, setBirthDateSearchResult] = useState<any[]>([]);
  async function searchPatientByBirthDate() {
    if (birthDate !== null) {
      const birthDatePlusOneSecond = new Date(birthDate.getTime());
      birthDatePlusOneSecond.setSeconds(birthDate.getSeconds() + 1);
      const q = query(
        patientsCollection,
        where("birthDate", ">=", birthDate),
        where("birthDate", "<=", birthDatePlusOneSecond)
      );
      const querySnapshot = await getDocs(q);
      const emptyBox: any[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        emptyBox.push({ ...doc.data(), id: doc.id });
      });
      setBirthDateSearchResult(emptyBox);
    }
  }

  return (
    <div>
      <Center>
        <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
          <TextInput
            withAsterisk
            label="First Name"
            style={{ width: rem(300) }}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            withAsterisk
            label="Middle Name"
            style={{ width: rem(300) }}
            {...form.getInputProps("middleName")}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            style={{ width: rem(300) }}
            {...form.getInputProps("lastName")}
          />
          <DateInput
            valueFormat="MM/DD/YYYY"
            value={birthDate}
            onChange={setBirthDate}
            label="Date of Birth"
            placeholder="MM/DD/YYYY"
            style={{ width: rem(300) }}
            maw={400}
            mx="auto"
          />
          <Button onClick={searchPatientByBirthDate}>Search</Button>
          <ul>
            {birthDateSearchResult.map((doc: any) => (
              <li key={doc.id}>{`${doc.firstName} ${doc.lastName}`}</li>
            ))}
          </ul>
          <TextInput
            withAsterisk
            label="MRN"
            placeholder=""
            {...form.getInputProps("MRN")}
          />
        </form>
      </Center>
    </div>
  );
}
