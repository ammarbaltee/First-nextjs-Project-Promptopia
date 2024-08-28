import React from 'react';

// Mapping languages to icon file names
const languageIcons = {
  'Python': 'python.png',
  'JavaScript': 'javascript.png',
  'Ruby': 'ruby.png',
  'Java': 'java.png',
  'C++': 'cpp.png',
  'Swift': 'swift.png',
  'Go': 'go.png',
  'C#': 'csharp.png'
};

const LanguageList = ({ languages }) => {
  return (
    <div className="language-list mt-5">
      <ul className="grid grid-cols-2 gap-4">
        {languages.map((language, index) => (
          <li key={index} className="flex items-center p-2 bg-white shadow-md rounded-lg hover:bg-gray-100">
            <img
              src={`/assets/icons/${languageIcons[language]}`}
              alt={`${language} icon`}
              className="w-6 h-6 mr-2"
            />
            <span className="text-lg font-medium">{language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageList;

