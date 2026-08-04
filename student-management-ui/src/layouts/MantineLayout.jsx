import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import NavbarMantine from "../components/mantine/NavbarMantine";

function MantineLayout() {

    return (

        <AppShell
            header={{ height: 70 }}
            padding="md"
        >

            <NavbarMantine />

            <AppShell.Main>

                <Outlet />

            </AppShell.Main>

        </AppShell>

    );

}

export default MantineLayout;