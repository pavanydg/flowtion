"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Themeswitch = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Wait until mounted to render the component
    if (!mounted) {
        return null;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            >
                {currentTheme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                    <Moon className="h-5 w-5 text-gray-800" />
                )}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
};
