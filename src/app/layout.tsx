import { Provider } from 'react-redux';
import HeaderView from '../components/header/HeaderView';
import { ThemeProvider } from '../context/ThemeProvider';
import '../index.css';
import { setupStore } from '../store/store';

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
              
                    <HeaderView />    
                    {children}
             
            </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
