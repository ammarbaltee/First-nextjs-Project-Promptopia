'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// Define the PromptCardList component
const PromptCardList = ({ data, handleTagClick, selectedTag }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          selectedTag={selectedTag}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState(''); // State for search input
  const [posts, setPosts] = useState([]); // State for displayed posts
  const [originalPosts, setOriginalPosts] = useState([]); // State for original, unfiltered posts
  const [selectedTag, setSelectedTag] = useState(''); // State for selected tag

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');

      if (!response.ok) {
        console.error('Error fetching posts:', await response.text());
        return;
      }

      try {
        const data = await response.json(); // Parse response JSON
        setPosts(data); // Set the fetched posts
        setOriginalPosts(data); // Store original posts for filtering
        console.log('Fetched posts:', data);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    };

    fetchPosts();
  }, []);

  // Handle tag click to filter posts
  const handleTagClick = (tag) => {
    console.log('Tag clicked:', tag);
    setSelectedTag(tag); // Set the selected tag
    setSearchText(''); // Reset search when tag is clicked

    // Filter posts based on the clicked tag
    const filteredPosts = originalPosts.filter((post) =>
      post.tag.toLowerCase() === tag.toLowerCase()
    );
    setPosts(filteredPosts); // Update posts with filtered posts
  };

  // Handle search input to filter posts by tag or username
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
  
    // Filter based on search input and selected tag (if any)
    const filteredPosts = originalPosts.filter((post) => {
      // Check if the post.creator and post.creator.username exist
      const hasCreator = post.creator && post.creator.username;
      
      return (
        (selectedTag === '' || post.tag.toLowerCase() === selectedTag.toLowerCase()) &&
        (
          post.tag.toLowerCase().includes(searchValue) ||
          (hasCreator && post.creator.username.toLowerCase().includes(searchValue))
        )
      );
    });
    
    setPosts(filteredPosts);
  };
  
  // Reset the posts when the user clears the search input
  const resetFilters = () => {
    setSearchText('');
    setSelectedTag('');
    setPosts(originalPosts);
  };

  return (
    <section className="feed">
      {/* Show selected tag and clear button */}
      {selectedTag && (
        <div>
          <span>Selected Tag: {selectedTag}</span>
          <button onClick={resetFilters} className="ml-2 text-blue-500 underline">
            Clear Filters
          </button>
        </div>
      )}

      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange} // Trigger filtering on input change
          required
          className="search_input peer"
        />
      </form>

      {/* Render the filtered posts */}
      <PromptCardList
        data={posts} // Pass current posts to display
        handleTagClick={handleTagClick} // Handle tag clicks for filtering
        selectedTag={selectedTag} // Pass selected tag for styling or highlighting
      />
    </section>
  );
};

export default Feed;
