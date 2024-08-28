'use client'
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    console.log("Prompt ID:", promptId); // Add this line for debugging

    const getPromptDetails = async () => {
      if (!promptId) {
        console.error("Prompt ID is undefined.");
        return;
      }

      try {
        const response = await fetch(`/api/prompt/${promptId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Failed to fetch prompt details:", error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); // use as some sort of loader later on
    
    if(!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });
      
      if (response.ok) {
        router.push('/'); // means homepage
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        isFormValid={isFormValid} // Pass the form validation state
        handleSubmit={updatePrompt} 
      />
    </Suspense>
  );
}

export default EditPrompt;
