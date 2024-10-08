import Link from 'next/link';
import React from 'react';

const Form = ({ type, post, setPost, submitting, isFormValid, handleSubmit }) => {
  const button = React.createElement(
    'button',
    {
      type: 'submit',
      disabled: submitting || !isFormValid, // Disable based on state
      className: `px-5 py-1.5 text-sm rounded-full text-white 
        ${submitting || !isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-orange'}`,
    },
    submitting ? `${type}...` : type
  );
  return (
    <section className="w-full max-w-full flex start flex-col">
      <h1 className="head_text text-left"> 
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} & share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>
      <form 
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glasmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea 
            value={post.prompt} 
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea" 
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>
          <span className="font-normal"> #product, #webdevelopment, #idea </span>
          
          <input 
            value={post.tag} 
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input" 
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          {button}
        </div>
      </form>
    </section>
  );
};

export default Form;

