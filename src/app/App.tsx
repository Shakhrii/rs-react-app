import { BrowserRouter } from 'react-router';
import './App.css';
import { ThemeProvider } from '../context/ThemeProvider';
import { AppContent } from './AppContent';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
