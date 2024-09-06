'use client';
import React, { useState } from 'react';
import Feed from '@components/Feed'; // Import your Feed component
import HoverImage from '@components/HoverImage';
import LanguageList from '@components/LanguageList';
import DynamicButton from '@components/DynamicButton';
import ModalContainer from '@components/ModalContainer'; // Import the Modal component

const Home = () => {
  const languages1 = ['JavaScript', 'Python', 'Ruby', 'Java'];
  const languages2 = ['C++', 'C#', 'Go', 'Swift'];


  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [allPrompts, setAllPrompts] = useState([]); // All prompts data
  const [filteredPrompts, setFilteredPrompts] = useState([]); // Filtered prompts

  // Fetch all prompts when the component mounts
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt'); // Fetch all prompts from your API
      const data = await response.json();
      setAllPrompts(data);
      setFilteredPrompts(data); // Initially, show all prompts
    };

    fetchPrompts();
  }, []);

  // Function to toggle button state
  const toggleButtonState = () => {
    setIsDisabled(prevState => !prevState);
  };
  // Modal handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Function to handle tag click and filter prompts by tag
  const handleTagClick = (tag) => {
    if (tag) {
      const filtered = allPrompts.filter((prompt) => prompt.tag.toLowerCase() === tag.toLowerCase());
      setFilteredPrompts(filtered);
    } else {
      setFilteredPrompts(allPrompts); // Reset to all prompts if no tag is selected
    }
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

      {/* Pass handleTagClick and filteredPrompts to Feed which renders feed component*/}
      <Feed prompts={filteredPrompts} handleTagClick={handleTagClick} />
      
      <div>
        {/* Render the DynamicButton component */}
        <p className="mb-4">This is where you can interact with the dynamic button below:</p>
        <DynamicButton />
      </div>

      {/* Use the LanguageList component multiple times with different data */}
      <LanguageList languages={languages1} />
      <LanguageList languages={languages2} />

      <div>
        {/* Button to open the modal */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 my-10"
          onClick={openModal}
        >
          Open Modal
        </button>
        {/* Render the ModalContainer component */}
      <ModalContainer isOpen={isOpen} onClose={closeModal} />
      </div>
    </section>
  );
};

export default Home;
