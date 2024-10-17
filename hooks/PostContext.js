"use client";

import { createContext, useContext, useState, useEffect } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchText, setSearchText] = useState('');

  // Fetch posts once on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setOriginalPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchText('');
    const filteredPosts = originalPosts.filter(post =>
      post.tag.toLowerCase() === tag.toLowerCase()
    );
    setPosts(filteredPosts);
  };

  const handleSearchChange = (value) => {
    setSearchText(value.toLowerCase());
    const filteredPosts = originalPosts.filter((post) => {
      const hasCreator = post.creator && post.creator.username;
      return (
        (selectedTag === '' || post.tag.toLowerCase() === selectedTag.toLowerCase()) &&
        (post.tag.toLowerCase().includes(value) || 
         (hasCreator && post.creator.username.toLowerCase().includes(value)))
      );
    });
    setPosts(filteredPosts);
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedTag('');
    setPosts(originalPosts);
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      handleTagClick, 
      handleSearchChange, 
      resetFilters, 
      searchText, 
      selectedTag 
    }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook for easy access to the context
export const usePostContext = () => useContext(PostContext);
