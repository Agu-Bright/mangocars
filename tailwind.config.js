import konstaConfig from 'konsta/config';

export default konstaConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  darkMode: 'class',
  theme: {
		extend: {
			colors: {
				primary: "#109324",
				secondary: "#E1C11A",
			},
		},
	},
})



