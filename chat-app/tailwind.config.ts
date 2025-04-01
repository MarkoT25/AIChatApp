import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				pulseColor: {
					'0%, 100%': {
						color: '#6495ED'
					},
					'50%': {
						color: 'red'
					}
				},
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
				}
			},
			animation: {
				pulseColor: 'pulseColor 1s infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			colors: {
				'white-opacity-5': '#FFFFFF0D',
				main: '#6495ED',
				background: '#0e1113',
				foreground: '#ffffff',
				card: {
					DEFAULT: '#161618',
					foreground: '#FEFEFE'
				},
				popover: {
					DEFAULT: '#28282A',
					foreground: '#979799'
				},
				primary: {
					'200': '#B8E1FF',
					'500': '#66B7F1',
					'600': '#0C75AF',
					'700': '#006096',
					DEFAULT: '#0C75AF',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#1C1F26',
					foreground: '#8E8E93'
				},
				muted: {
					DEFAULT: '#292929',
					foreground: '#AEAEB2'
				},
				accent: {
					DEFAULT: '#6495ED',
					foreground: '#B8E1FF'
				},
				destructive: {
					DEFAULT: '#F04438',
					foreground: '#FEE4E2'
				},
				border: '#3E3E40',
				input: '#1A1A1C',
				ring: '#0C75AF',
				chart: {
					'1': '#006096',
					'2': '#66B7F1',
					'3': '#B8E1FF',
					'4': '#12B76A',
					'5': '#F04438'
				},
				disabled: '#D9D9D9',
				'on-disabled': '#B3B3B3',
				disabled2: '#3B3B3D',
				surface: '#161618',
				'on-surface': '#FEFEFE',
				'surface-variant': '#28282A',
				'on-surface-variant': '#979799',
				'inverse-surface': '#FEFEFE',
				'inverse-on-surface': '#1F1F21',
				outline: '#1A1A1C',
				'outline-variant': '#3E3E40',
				success: '#12B76A',
				'success-variant': '#D1FADF',
				error: '#F04438',
				'error-variant': '#FEE4E2'
			},
			borderWidth: {
				'0.5': '0.1px'
			},
			fontFamily: {
				'roboto-mono': [
					'Roboto Mono',
					'sans-serif'
				],
				'niagara-solid': [
					'Niagara Solid',
					'sans-serif'
				],
				alegreya: [
					'Alegreya Sans',
					'sans-serif'
				]
			},
			fontSize: {
				'12': [
					'0.75rem',
					{
						lineHeight: '1.125rem'
					}
				],
				'14': [
					'0.875rem',
					{
						lineHeight: '1.25rem'
					}
				],
				'16': [
					'1rem',
					{
						lineHeight: '1.5rem'
					}
				],
				'18': [
					'1.125rem',
					{
						lineHeight: '1.75rem'
					}
				],
				'20': [
					'1.25rem',
					{
						lineHeight: '1.875rem'
					}
				],
				'24': [
					'1.5rem',
					{
						lineHeight: '2rem'
					}
				],
				'30': [
					'1.875rem',
					{
						lineHeight: '2.375rem'
					}
				],
				'36': [
					'2.25rem',
					{
						lineHeight: '2.75rem',
						letterSpacing: '-0.02em'
					}
				],
				'48': [
					'3rem',
					{
						lineHeight: '3.75rem',
						letterSpacing: '-0.02em'
					}
				],
				'60': [
					'3.75rem',
					{
						lineHeight: '4.5rem',
						letterSpacing: '-0.02em'
					}
				],
				'72': [
					'4.5rem',
					{
						lineHeight: '5.625rem',
						letterSpacing: '-0.02em'
					}
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		}
	},
	plugins: [
		function ({ addUtilities }: { addUtilities: any }) {
			const newUtilities = {
				'.hide-scrollbar': {
					'scrollbar-width': 'none' /* Firefox */,
					'-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
				},
				'.hide-scrollbar::-webkit-scrollbar': {
					display: 'none' /* Safari and Chrome */,
				},
				'.fancy-scrollbar': {
					'scrollbar-width': 'thin',
					'scrollbar-color': '#292929 #0e1113',
				},
				'.fancy-scrollbar::-webkit-scrollbar': {
					width: '8px',
					height: '8px',
				},
				'.fancy-scrollbar::-webkit-scrollbar-track': {
					background: '#0e1113',
				},
				'.fancy-scrollbar::-webkit-scrollbar-thumb': {
					background: '#292929',
					borderRadius: '10px',
				},
				'.fancy-scrollbar::-webkit-scrollbar-thumb:hover': {
					background: '#444444',
				},
			};
			addUtilities(newUtilities);
		},
		require("tailwindcss-animate")
	],
};

export default config;