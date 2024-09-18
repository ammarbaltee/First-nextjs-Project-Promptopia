"use client";

import { useState } from 'react';
import Image from 'next/image'; // Note: Use the correct import for Image
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, selectedTag  }) => {
  const { data:session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  // Function to handle copying the prompt to clipboard
  const handleCopy = () => {
    if (navigator.clipboard) {
        setCopied(post.prompt); // Set the copied state to the prompt text
        navigator.clipboard.writeText(post.prompt) // Copy the prompt text to clipboard
            .then(() => {
                console.log('Text copied');
            })
            .catch(err => {
                console.error('Could not copy text', err);
            });
        setTimeout(() => setCopied(""), 3000);  // Reset the copied state after 3 seconds
    } else {
        console.error('Clipboard API not supported');
    }
}

  
  // Check if the creator data exists, provide fallback if not
  const creator = post.creator || {};

  return (
    <div className="prompt_card">
      <div className='flex justify-between items-start gap-52'>
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={creator.image || '/path/to/default-image.jpg'} // Provide a default image if creator.image is null
            alt="user_image" 
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-santoshi font-semibold text-gray-900">
              {creator.userName || 'Unknown User'} {/* Provide fallback text if creator.username is null */}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {creator.email || 'No email provided'} {/* Provide fallback text if creator.email is null */}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}> 
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-santoshi text-sm text-gray-700">{post.prompt}</p>
      <p className={`font-inter text-sm cursor-pointer ${
          selectedTag === post.tag ? 'active_tag' : 'blue_gradient'
        }`}
        onClick={() => handleTagClick && handleTagClick(post.tag)} 
      > {/* Arrow function for tag filtering. Only call if handleTagClick exists 
          Send the tag to the parent component using the callback*/}
        #{post.tag}
      </p>

        {/* conditional logic combined with optional chaining to determine whether certain content should be rendered based on specific conditions.*/}
          {/*used to display options like "Edit" and "Delete" buttons only if:
            The logged-in user is the creator of the prompt.
            The user is currently viewing their profile page.*/}

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm 
          green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p className="font-inter text-sm 
          orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;
