import LightClasses from "./NavbarLight.module.css";
import DarkClasses from "./NavbarDark.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  let styles;
  theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  return (
    <nav className={styles.navBody}>
      <h1 className={styles.header}>Where in the World?</h1>
      <button onClick={toggleTheme} className={styles.button}>
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
