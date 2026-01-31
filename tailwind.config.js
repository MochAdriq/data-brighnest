import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            // INI BAGIAN YANG DITAMBAHKAN DARI KODE LAMA BOSS:
            colors: {
                primary: "#1d1f9a",
                secondary: "#F59E0B",
            },
        },
    },

    plugins: [forms],
};
