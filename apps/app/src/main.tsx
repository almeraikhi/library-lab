import ReactDOM from 'react-dom/client';
import { App } from './router';
import './index.css';
// import '@oent/tailwind-config/style';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
