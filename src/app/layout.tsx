import { Provider } from 'react-redux';
import HeaderView from '../components/header/HeaderView';
import { ThemeProvider } from '../context/ThemeProvider';
import '../index.css';
import StoreProvider from './StoreProvider';
import ErrorBoundary from '../components/error/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root" className='flex flex-col items-center justify-center'>
            <ThemeProvider>
                <StoreProvider>
                        <HeaderView />    
                        {children}
                </StoreProvider>
            </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
