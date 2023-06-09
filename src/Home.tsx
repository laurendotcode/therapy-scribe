import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ScrollArea,
  NavLink,
} from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Link, Route, Routes } from "react-router-dom";
import { PatientIntakeForm } from "./PatientIntakeForm";
import { PatientList } from "./PatientList";
import { PatientChart } from "./PatientChart";
import { PatientCharts } from "./PatientCharts";

export function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Link to="/PatientIntakeForm">
              <NavLink
                label="Intake"
                icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
              />{" "}
            </Link>
            <NavLink
              label="Schedule"
              icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Work Log"
              icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Reports"
              icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Settings"
              icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Help"
              icon={<IconCalendarEvent size="1rem" stroke={1.5} />}
            />
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <PatientList />
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footers
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Therapy Scribe</Text>
          </div>
        </Header>
      }
    >
      <Routes>
        <Route path="/PatientIntakeForm" element={<PatientIntakeForm />} />
        <Route path="/PatientCharts" element={<PatientCharts />} />
      </Routes>
    </AppShell>
  );
}
