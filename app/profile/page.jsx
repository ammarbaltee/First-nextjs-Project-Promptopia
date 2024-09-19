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
    // Ensure post has an _id field
    if (!post._id) {
      console.error('Post object does not have _id:', post);
      return;
    }
  
    // Convert _id to string if necessary
    const postId = post._id.toString();
  
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${postId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete prompt: ${response.statusText}`);
        }
  
        // Update the state to remove the deleted post
        const filteredPosts = posts.filter((p) => p._id.toString() !== postId);
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to delete the prompt:', error);
      }
    }
  };
  
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
