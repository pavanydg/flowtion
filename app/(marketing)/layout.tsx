import React from "react";
import NavBar from "./_components/NavBar";

const LandingingLayout = async ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full dark:bg-[#1F1F1F]">
            <NavBar/>
            <div className="h-full pt-40">
                {children}
            </div>
        </main>
    );
}

export default LandingingLayout;