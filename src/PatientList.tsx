import {
  Button,
  Container,
  ScrollArea,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { useGetNames } from "./useGetNames";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedPatientAtom, selectedPatientsAtom } from "./atoms";

export function PatientList() {
  const names = useGetNames();
  const [selectedPatients, setSelectedPatients] = useAtom(selectedPatientsAtom);
  const [selectedPatient, setSelectedPatient] = useAtom(selectedPatientAtom);
  function handlePatientClick(name: string) {
    if (selectedPatients.includes(name)) {
      setSelectedPatient(name);
    } else {
      setSelectedPatients([...selectedPatients, name]);
    }
  }

  return (
    <Container>
      <TextInput />
      <Space h="md" />
      <ScrollArea>
        <Stack justify="flex-start">
          {names.map((name) => {
            return (
              <Button onClick={() => handlePatientClick(name)} key={name}>
                {name}
              </Button>
            );
          })}
        </Stack>
      </ScrollArea>
    </Container>
  );
}
