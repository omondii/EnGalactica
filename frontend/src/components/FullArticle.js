import React from 'react';

const FullArticle = ({ article, onClose }) => {
  return (
    <div className="full-article">
      <h2>{article.title}</h2>
      <p>Published @ {article.timestamp}</p>
      <p>{article.content}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FullArticle;