import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        css: true,
    },
});

//TESTING LINK: https://youtu.be/G-4zgIPsjkU?si=qwBxv5d0XCC5PIT_
