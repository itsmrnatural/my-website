import colors from "tailwindcss/colors";

export const mode = "jit";
export const purge = [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Karla: ["Karla", "sans-serif"],
    },
    extend: {
        colors: {
            ...colors,
        },
    },
};
export const variants = {
    extend: {},
};
export const plugins = [];
