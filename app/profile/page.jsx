"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data:session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      
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
    
    if(session?.user.id) fetchPosts();
  }, []); // Call it initially as soon as the page starts

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}/`)
  }
      
  const handleDelete = async (post) => {
    // Ensure _id is a string
  const postId = post._id ? post._id.toString() : null;

  if (!postId) {
    console.error('Post ID is missing');
    return;
  }

    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed) {
      try {
        // Make DELETE request to the backend
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });

        // Check if response is ok
      if (!response.ok) {
        console.error('Failed to delete the prompt:', await response.text());
        return; // Stop execution if the request fails
      }

        // Filter out the deleted post from the state
        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <Profile 
        name={session?.user?.name || 'User'}  // Use the user's name from the session data
        desc="Welcome to your personlized Profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
