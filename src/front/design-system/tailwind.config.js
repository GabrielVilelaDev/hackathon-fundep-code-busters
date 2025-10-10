/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  safelist: [
    // ------------------------------
    // 🔹 Classes utilitárias gerais
    // ------------------------------
    {
      pattern:
        /^(aspect|container|columns|break|box|display|float|clear|isolation|object|overflow|overscroll|position|inset|top|right|bottom|left|z|order|grid|col|row|auto|gap|justify|content|items|place|p|px|py|pl|pr|pt|pb|m|mx|my|ml|mr|mt|mb|space|w|min-w|max-w|h|min-h|max-h|size|font|text|tracking|leading|list|placeholder|align|whitespace|break|rounded|border|ring|divide|outline|shadow|opacity|mix-blend|bg|from|via|to|gradient|decoration|underline|line|indent|content|transition|duration|ease|delay|animate|transform|scale|rotate|translate|skew|origin|cursor|select|resize|scroll|touch|pointer|will-change|appearance|accent|caret|contrast|brightness|blur|backdrop|filter|sepia|saturate|invert|hue|drop|stroke|fill|table|caption|border-spacing|shadow-inner|isolation|aspect|sr|not-prose)(-|$)/,
      variants: [
        "hover",
        "focus",
        "active",
        "disabled",
        "visited",
        "checked",
        "focus-visible",
        "focus-within",
        "group-hover",
        "group-focus",
        "motion-safe",
        "motion-reduce",
        "first",
        "last",
        "odd",
        "even",
        "before",
        "after",
        "placeholder",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "dark",
        "rtl",
        "open",
      ],
    },

    // ------------------------------
    // 🔹 Cores principais do Tailwind
    // (para garantir bg/text/border/etc.)
    // ------------------------------
    {
      pattern: /(bg|text|border|ring|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },

    // ------------------------------
    // 🔹 Classes com variáveis CSS
    // ------------------------------
    {
      pattern: /\[var\(--.*\)\]/,
    },

    // ------------------------------
    // 🔹 Espaçamentos e tamanhos dinâmicos
    // ------------------------------
    {
      pattern: /(w|h|min-w|min-h|max-w|max-h|p|m|gap|space|top|bottom|left|right|inset)-\[.*\]/,
    },

    // ------------------------------
    // 🔹 Cores ou valores arbitrários
    // (como bg-[rgba(255,255,255,0.5)] ou text-[color:var(--foo)])
    // ------------------------------
    {
      pattern: /(bg|text|border|shadow|ring|from|via|to|outline)-\[.*\]/,
    },

    // ------------------------------
    // 🔹 Flex/Grid e layout dinâmico
    // ------------------------------
    {
      pattern: /(flex|grid|col|row|items|justify|content|place|gap|order|basis|grow|shrink)-.*/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
