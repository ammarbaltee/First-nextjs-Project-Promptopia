'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

// Define the PromptCardList component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]); // This is the displayed posts
  const [originalPosts, setOriginalPosts] = useState([]); // Keep the original posts
  const [selectedTag, setSelectedTag] = useState(''); // Track selected tag

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

   // Fetch all prompts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      
      // Check if response is ok and log it
      if (!response.ok) {
        console.error('Error fetching posts:', await response.text());
        return;
      }
  
      try {
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    };
  
    fetchPosts();
  }, []); // Call it initially as soon as the page starts

   // Handle tag click to filter posts
   const handleTagClick = (tag) => {
    setSelectedTag(tag); // Set the selected tag
    if (tag === '') {
      // If tag is empty, reset to original posts
      setPosts(originalPosts);
    } else {
      // Filter posts based on the clicked tag
      const filteredPosts = originalPosts.filter((post) =>
        post.tag.toLowerCase() === tag.toLowerCase()
      );
      setPosts(filteredPosts);
    }
  };

  // Reset posts when no tag is selected
  useEffect(() => {
    if (!selectedTag) {
      setPosts(originalPosts);
    }
  }, [selectedTag, originalPosts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      {/* Render filtered posts if a tag is active, otherwise render all posts */}
      {selectedTag ? (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList 
        data={posts} 
        handleTagClick={handleTagClick} /> // Pass handleTagClick to PromptCard
      )}
    </section>
  );
};

export default Feed;
