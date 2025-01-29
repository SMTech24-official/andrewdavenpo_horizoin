import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter'
  			]
  		},
  		bg_primary: '#333333',
  		container: {
  			center: true,
  			padding: '1rem',
  			screens: {
  				sm: '776px',
  				md: '968px',
  				lg: '1640px',
  				xl: '1140px',
  				'3xl': '1320px'
  			}
  		},
  		colors: {
  			bg_primary: '#333333',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
