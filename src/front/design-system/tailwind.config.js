/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    {
      pattern:
        /^(w-|h-|bg-|text-|border-|p-|m-|space-|max-w-|max-h-|mx-|cursor-|transition-|hover:|md:|grid-|flex-|shadow-)/,
      variants: ["hover", "focus", "md", "lg", "xl"]
    },
    "hidden",
    "w-[20px]",
    "h-[20px]",
    "bg-green-500",
    "cursor-pointer",
    "transition-all",
    "hover:shadow-md",
    "border-primary",
    "md:grid-cols-2",
    "md:flex-row",
    "md:hidden",
    "md:flex",
    "max-w-4xl",
    "mx-auto",
    "space-y-6",
    "space-y-2",
    "p-6",
    "md:flex-col",
    "max-h-[500px]",
    "bg-primary-foreground",
    "text-primary",
    "hover:bg-primary-foreground",
    "hover:text-primary"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
