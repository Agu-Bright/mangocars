// Import React and ReactDOM
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/app.css';
import '../css/icons.css';

// Import App Component
import App from '../components/App/app.jsx';

// Init F7 React Plugin
Framework7.use(Framework7React)

// Mount React App
const root = createRoot(document.getElementById('app'));
root.render(createElement(App));