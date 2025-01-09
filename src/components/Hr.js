import React from 'react';

function Hr({ text = '' }) {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
      {text && (
        <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-500">
          {text}
        </span>
      )}
      <div className="flex-grow border-t border-gray-400 dark:border-gray-600"></div>
    </div>
  );
}

export default Hr;
