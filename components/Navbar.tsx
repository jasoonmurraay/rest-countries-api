import LightClasses from "./NavbarLight.module.css";
import DarkClasses from "./NavbarDark.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const Navbar = (props: Object) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav
      className={theme === "light" ? LightClasses.navBody : DarkClasses.navBody}
    >
      <h1
        className={theme === "light" ? LightClasses.header : DarkClasses.header}
      >
        Where in the World?
      </h1>
      <button
        onClick={toggleTheme}
        className={theme === "light" ? LightClasses.button : DarkClasses.button}
      >
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
