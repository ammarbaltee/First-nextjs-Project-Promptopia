'use client';
import React, { useState } from 'react';
import { PostProvider } from '../hooks/PostContext'; // Import the PostProvider
import Feed from '@components/Feed'; // Import your Feed component
import HoverImage from '@components/HoverImage';
import LanguageList from '@components/LanguageList';
import DynamicButton from '@components/DynamicButton';
import ModalContainer from '@components/ModalContainer'; // Import the Modal component

const Home = () => {
  const languages1 = ['JavaScript', 'Python', 'Ruby', 'Java'];
  const languages2 = ['C++', 'C#', 'Go', 'Swift'];

  const [isOpen, setIsOpen] = useState(false); // State for modal visibility

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PostProvider>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share AI Prompt
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> AI-Powered Prompts </span>
        </h1>
        <p className="desc text-center">
        Promptopia is an open-source AI tool for the modern world to discover, create, and share creative prompts.
        </p>
         
        <HoverImage />
        
        <Feed /> {/* Render Feed component */}
        
        <div>
          <p className="mb-4">This is where you can interact with the dynamic button below:</p>
          <DynamicButton />
        </div>

        <LanguageList languages={languages1} />
        <LanguageList languages={languages2} />

        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 my-10"
            onClick={openModal}
          >
            Open Modal
          </button>
          <ModalContainer isOpen={isOpen} onClose={closeModal} />
        </div>
      </section>
    </PostProvider>
  );
};

export default Home;
