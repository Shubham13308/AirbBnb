import React from "react";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropDown from "./LinksDropDown";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='border-b'>
      <div className='container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8'>
        <Logo />

        {pathname === '/' && <NavSearch />}

        <div className='flex gap-4 items-center'>
          <DarkMode />
          <LinksDropDown />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
