import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    rules: {
      // Stylistic rules
      "semi": ["error", "always"], // Enforce semicolons
      "no-multi-spaces": "error", // Disallow multiple spaces
      "prefer-const": "warn", // Prefer `const` over `let` when variables are not reassigned
      "no-console": "warn", // Warning for console logs
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "module" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
]);
