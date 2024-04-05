import React from 'react';

const NewsItem = ({ title, desc, imageURL, newsUrl }) => {
  return (
    <div className="news-item">
      <a href={newsUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageURL} alt={title} className="news-image" />
        <h4>{title}</h4>
        <p>{desc}</p>
      </a>
    </div>
  );
}

export default NewsItem;
