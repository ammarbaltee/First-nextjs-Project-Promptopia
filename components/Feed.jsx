'use client';

import { usePostContext } from '@/hooks/PostContext';
import PromptCard from './PromptCard';

// Define the PromptCardList component
const PromptCardList = ({ handleTagClick, selectedTag, handleDelete }) => {
  const { posts } = usePostContext(); // Use context to get posts
  return (
      <div className="mt-16 prompt_layout">
          {posts.map((post) => (
              <PromptCard
                  key={post._id}
                  post={post}
                  handleTagClick={handleTagClick}
                  selectedTag={selectedTag}
                  handleDelete={handleDelete} // Pass the delete function
              />
          ))}
      </div>
  );
};

const Feed = ({ handleDelete }) => {
  const { 
    posts, 
    handleTagClick, 
    handleSearchChange, 
    resetFilters, 
    searchText, 
    selectedTag 
  } = usePostContext();

  return (
    <section className="feed">
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
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Feed;
