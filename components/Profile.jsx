// components/Profile.jsx
import PromptCard from './PromptCard';

const Profile = ({ name, desc, data }) => {
  return (
    <div className="profile">
      <h1>{name}</h1>
      <p>{desc}</p>
      {/* Display posts */}
      <div className="posts">
        {data.length > 0 ? (
          data.map(post => (
            <PromptCard
              key={post._id}
              post={post}
              // Add any other necessary props for PromptCard
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
