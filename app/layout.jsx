import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='relative min-h-screen'>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <Nav />
          <main className='app'>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
