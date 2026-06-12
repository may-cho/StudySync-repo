import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { useDarkMode } from "../hooks/useDarkMode";

const Layout = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-main">
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
