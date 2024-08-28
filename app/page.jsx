'use client'
import React from 'react';
import Feed from '@components/Feed'; // Import your Feed component
import HoverImage from '@components/HoverImage';
import LanguageList from '@components/LanguageList';
import DynamicButton from '@components/DynamicButton';
import { useState } from 'react';

const Home = () => {
  const languages1 = ['JavaScript', 'Python', 'Ruby', 'Java'];
  const languages2 = ['C++', 'C#', 'Go', 'Swift'];

  const [isDisabled, setIsDisabled] = useState(false);

  const toggleButtonState = () => {
    setIsDisabled(prevState => !prevState); {/*The function prevState => !prevState is a "functional update" pattern. 
      prevState is the current value of the isDisabled state before the update.
      !prevState toggles the current state value. If prevState is true, !prevState becomes false, and vice versa.*/}
  };

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share AI Prompt
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI tool for the modern world to discover, create, and share creative prompts.
      </p>
       
      {/* Image with event handlers */}
      <HoverImage />

      <Feed /> {/* Render Feed component */}
      
      <div>
        {/* Render the DynamicButton component */}
        <p className="mb-4">This is where you can interact with the dynamic button below:</p>
        <DynamicButton />
      </div>

      {/* Use the LanguageList component multiple times with different data */}
      <LanguageList languages={languages1} />
      <LanguageList languages={languages2} />

    </section>
  );
}

export default Home;

