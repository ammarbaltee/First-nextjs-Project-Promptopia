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

  // Fetch all posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      
      if (!response.ok) {
        console.error('Error fetching posts:', await response.text());
        return;
      }
  
      try {
        const data = await response.json();
        setPosts(data);
        setOriginalPosts(data);  // Set the original posts as well
        console.log('Fetched posts:', data);  // Debug log for posts
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    };
  
    fetchPosts();
  }, []); // Call it initially as soon as the page starts

  // Handle tag click to filter posts
  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag); // Debug log for clicked tag
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
      console.log('Filtered posts:', filteredPosts); // Debug log for filtered posts
    }
  };

  // Handle search change to filter posts based on search text
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filteredPosts = originalPosts.filter(
      (post) =>
        post.tag.toLowerCase().includes(searchValue) ||
        post.creator.username.toLowerCase().includes(searchValue)
    );
    setPosts(filteredPosts);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange} // Use the handleSearchChange function
          required
          className="search_input peer"
        />
      </form>

      {/* Render posts */}
      <PromptCardList 
        data={posts} 
        handleTagClick={handleTagClick} 
      />
    </section>
  );
};

export default Feed;
