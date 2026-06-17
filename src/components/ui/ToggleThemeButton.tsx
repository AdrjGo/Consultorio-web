import { useThemeStore } from "@store";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button onClick={toggleTheme} className="p-1 rounded-lg">
      {theme === "light" ? (
        <Sun size={18} className="text-gray-700" />
      ) : (
        <Moon size={18} className="text-gray-300" />
      )}
    </button>
  );
}

export default ToggleThemeButton;
