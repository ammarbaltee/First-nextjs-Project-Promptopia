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
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [activeTag, setActiveTag] = useState(''); // State for the active tag filter

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
  // Define handleTagClick function here
  const handleTagClick = (tag) => {
    console.log(`Tag clicked: ${tag}`);
    // Add logic to filter posts by tag, or other behavior
    if (tag) {
      const filtered = posts.filter((post) => post.tag === tag);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Reset to all posts if no tag selected
    }
  };
  // Reset tag filtering when searchText changes (optional)
  useEffect(() => {
    if (searchText === '') {
      setFilteredPosts([]); // Reset filteredPosts if searchText is cleared
      setActiveTag(''); // Clear active tag
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Render filtered posts if a tag is active, otherwise render all posts */}
      {activeTag ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList 
        data={posts} 
        handleTagClick={handleTagClick} /> // Pass handleTagClick to PromptCard
      )}
    </section>
  );
};

export default Feed;
