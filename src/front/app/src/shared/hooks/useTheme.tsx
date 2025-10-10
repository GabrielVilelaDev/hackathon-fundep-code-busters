import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme-preference";

function getSystemTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "system";
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored === "light" || stored === "dark" || stored === "system") {
		return stored;
	}
	return "system";
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>(getStoredTheme);
	const systemTheme = getSystemTheme();
	const resolvedTheme = theme === "system" ? systemTheme : theme;

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(resolvedTheme);

		root.setAttribute("data-theme", resolvedTheme);
	}, [resolvedTheme]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") {
				const newSystemTheme = getSystemTheme();
				const root = window.document.documentElement;
				root.classList.remove("light", "dark");
				root.classList.add(newSystemTheme);
				root.setAttribute("data-theme", newSystemTheme);
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		localStorage.setItem(THEME_STORAGE_KEY, newTheme);
		setThemeState(newTheme);
	};

	const toggleTheme = () => {
		const newTheme = resolvedTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	};

	return {
		theme,
		setTheme,
		resolvedTheme,
		systemTheme,
		themes: ["light", "dark", "system"] as const,
		forcedTheme: undefined,
		toggleTheme,
	};
}