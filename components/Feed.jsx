'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// Define the PromptCardList component
const PromptCardList = ({ data, handleTagClick, selectedTag }) => {
  return (
    <div className="mt-16 prompt_layout">
      {/* Map over the data (posts) and pass each post to PromptCard */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post} // Data for the current post
          handleTagClick={handleTagClick} // Pass the handleTagClick callback to the child component
          selectedTag={selectedTag}  // Pass the selectedTag state to the child component
        />
      ))}
    </div>
  );
};

const Feed = ({ initialPosts, handleTagClick: parentHandleTagClick }) => {
  const [searchText, setSearchText] = useState(''); // State for storing the search input
  const [posts, setPosts] = useState(initialPosts || []); // State for storing the displayed posts
  const [originalPosts, setOriginalPosts] = useState(initialPosts || []); // State for storing the original unfiltered posts
  const [selectedTag, setSelectedTag] = useState(''); // State for tracking the selected tag

  // Fetch all posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      
      if (!response.ok) {
        console.error('Error fetching posts:', await response.text());
        return;
      }
  
      try {
        const data = await response.json(); // Parse the response JSON
        setPosts(data); // Set the posts in the state
        setOriginalPosts(data);  // Keep a copy of the original posts in the state
        console.log('Fetched posts:', data);  // Debug log for posts
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    };
  
    fetchPosts(); // Trigger the fetch
  }, []); // Call it initially as soon as the page starts/component mounts

  // Handle tag click to filter posts
  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag); // Debug log for clicked tag
    setSelectedTag(tag); // Set the selected tag
    if (tag === '') {
      // If no tag is selected, reset the posts to the original list
      setPosts(originalPosts);
    } else {
      // Filter posts based on the clicked tag
      const filteredPosts = originalPosts.filter((post) =>
        post.tag.toLowerCase() === tag.toLowerCase()
      );
      setPosts(filteredPosts); // Update the posts with the filtered ones
      console.log('Filtered posts:', filteredPosts); // Debug log for filtered posts
    }
  };

  // Handle search input change to filter posts by tag or username
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    // Filter posts based on tag or creator username
    const filteredPosts = originalPosts.filter(
      (post) =>
        post.tag.toLowerCase().includes(searchValue) ||
        post.creator.username.toLowerCase().includes(searchValue)
    );
    setPosts(filteredPosts);
  };

  return (
    <section className="feed">
      {/* Display the currently selected tag if one is chosen */}
      {selectedTag && <div>Selected Tag: {selectedTag}</div>} 
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange} // Trigger the search filter on input change
          required
          className="search_input peer"
        />
      </form>

      {/* Render posts */}
      <PromptCardList 
        data={posts} // Pass the current (filtered) posts to display
        handleTagClick={handleTagClick} // Pass the callback function to handle tag clicks
        selectedTag={selectedTag}  // Pass the selected tag to highlight it in the child component
      />
    </section>
  );
};

export default Feed;
