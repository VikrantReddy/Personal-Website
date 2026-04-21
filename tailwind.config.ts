import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '#757c7d',
				input: '#f2f4f4',
				ring: '#2d3435',
				background: '#f9f9f9',
				foreground: '#2d3435',
				primary: {
					DEFAULT: '#5f5e5e',
					foreground: '#faf7f6',
					container: '#e5e2e1',
					'fixed': '#e5e2e1',
					'fixed-dim': '#d6d4d3',
					'dim': '#535252'
				},
				secondary: {
					DEFAULT: '#5f5f5f',
					foreground: '#faf8f8',
					container: '#e4e2e2',
					'fixed': '#e4e2e2',
					'fixed-dim': '#d5d4d4',
					'dim': '#535353'
				},
				destructive: {
					DEFAULT: '#9f403d',
					foreground: '#fff7f6'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#2d3435'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#2d3435'
				},
				sidebar: {
					DEFAULT: '#f9f9f9',
					foreground: '#2d3435',
					primary: '#5f5e5e',
					'primary-foreground': '#faf7f6',
					accent: '#5f5e5e',
					'accent-foreground': '#faf7f6',
					border: '#dde4e5',
					ring: '#5f5e5e'
				},
				surface: '#f9f9f9',
				'surface-bright': '#f9f9f9',
				'surface-container-low': '#f2f4f4',
				'surface-container-lowest': '#ffffff',
				'surface-container': '#ebeeef',
				'surface-container-high': '#e4e9ea',
				'surface-container-highest': '#dde4e5',
				'surface-dim': '#d4dbdd',
				'surface-variant': '#dde4e5',
				'surface-tint': '#5f5e5e',
				'on-surface': '#2d3435',
				'on-surface-variant': '#5a6061',
				'on-background': '#2d3435',
				'on-primary': '#faf7f6',
				'on-primary-fixed': '#403f3f',
				'on-primary-fixed-variant': '#5c5b5b',
				'on-primary-container': '#525151',
				'on-secondary': '#faf8f8',
				'on-secondary-fixed': '#3f3f3f',
				'on-secondary-fixed-variant': '#5b5b5b',
				'on-secondary-container': '#515252',
				tertiary: '#5e5f5f',
				'tertiary-container': '#f4f3f3',
				'tertiary-fixed': '#f4f3f3',
				'tertiary-fixed-dim': '#e5e5e5',
				'tertiary-dim': '#525354',
				'on-tertiary': '#f9f9f9',
				'on-tertiary-fixed': '#484a4a',
				'on-tertiary-fixed-variant': '#656667',
				'on-tertiary-container': '#5a5c5c',
				'outline': '#757c7d',
				'outline-variant': '#adb3b4',
				error: '#9f403d',
				'error-container': '#fe8983',
				'error-dim': '#4e0309',
				'on-error': '#fff7f6',
				'on-error-container': '#752121',
				'inverse-surface': '#0c0f0f',
				'inverse-on-surface': '#9c9d9d',
				'inverse-primary': '#ffffff',
				'steel-blue': 'hsl(var(--steel-blue))',
				'charcoal': 'hsl(var(--charcoal))',
				'silver': 'hsl(var(--silver))',
				'deep-blue': 'hsl(var(--deep-blue))',
				'slate': 'hsl(var(--slate))'
			},
			backgroundImage: {
				'gradient-steel': 'var(--gradient-steel)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			boxShadow: {
				'glow-steel': 'var(--glow-steel)',
				'glow-subtle': 'var(--glow-subtle)',
				'deep': 'var(--shadow-deep)'
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
				'body': ['Manrope', 'system-ui', 'sans-serif'],
				'label': ['Space Grotesk', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'elegant-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 5px hsl(var(--neon-cyan))' },
					'50%': { boxShadow: '0 0 25px hsl(var(--neon-cyan)), 0 0 50px hsl(var(--neon-cyan))' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'elegant-float': 'elegant-float 8s ease-in-out infinite',
				'shimmer': 'shimmer 0.6s ease-out',
				'blink': 'blink 1s infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
