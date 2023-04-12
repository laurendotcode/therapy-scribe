import { Tabs } from "@mantine/core";
import { useAtom } from "jotai";
import { selectedPatientAtom, selectedPatientsAtom } from "./atoms";

export function PatientCharts() {
  const [selectedPatients, setSelectedPatients] = useAtom(selectedPatientsAtom);
  const [selectedPatient, setSelectedPatient] = useAtom(selectedPatientAtom);

  return (
    <Tabs
      defaultValue={selectedPatient}
      value={selectedPatient}
      onTabChange={setSelectedPatient}
    >
      <Tabs.List>
        {selectedPatients.map((name) => (
          <Tabs.Tab value={name} key={name}>
            {name}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {selectedPatients.map((name) => (
        <Tabs.Panel value={name} key={name} pt="xs">
          CONTENT {name}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
