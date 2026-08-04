import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {

    const [framework, setFramework] = useState(() => {

        return localStorage.getItem("framework") || "bootstrap";

    });

    useEffect(() => {

        localStorage.setItem("framework", framework);

    }, [framework]);

    const toggleFramework = () => {

        setFramework(current =>
            current === "bootstrap"
                ? "mantine"
                : "bootstrap"
        );

    };

    return (

        <UIContext.Provider
            value={{
                framework,
                setFramework,
                toggleFramework
            }}
        >

            {children}

        </UIContext.Provider>

    );

}

export function useUI() {

    return useContext(UIContext);

}