// layout.jsx
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Suspense } from 'react';
import ModalContainer from '@components/ModalContainer'; // Import the ModalContainer component
import Footer from '@components/Footer';

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
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
            <ModalContainer /> {/* Render the ModalContainer component */}
          </main>
        </Provider>
        <Footer />
        <div id="modal-root"></div> {/* Modal root container */}
      </body>
    </html>
  );
};

export default RootLayout;
