'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  // Check if the form is valid whenever post changes
  useEffect(() => {
    const isValid = post.prompt.trim() !== '' && post.tag.trim() !== ''; // Check if both fields are filled
    setIsFormValid(isValid);
  }, [post]);

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      isFormValid={isFormValid} // Pass form validity to Form component
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;



