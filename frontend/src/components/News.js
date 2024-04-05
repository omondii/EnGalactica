import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsList'; // Assuming NewsItem is a component to display individual news items
import '../assets/css/News.css';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSpaceNews();
  }, []);

  const fetchSpaceNews = async () => {
    try {
      const response = await fetch('/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(data);
      setTotalResults(data.length);
    } catch (error) {
      console.error('Error fetching space news:', error);
      // Handle error by setting a default value or showing an error message
      setArticles([]); // Set articles to empty array in case of error
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/news?page=${page + 1}`);
      if (!response.ok) {
        throw new Error('Failed to fetch more news');
      }
      const newData = await response.json();
      setArticles([...articles, ...newData]);
      setTotalResults(totalResults + newData.length);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching more space news:', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalResults}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
      <div className="container my-3">
        <div className="row">
          {articles.map((article) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={article.id}>
              <NewsItem
                title={article.title}
                desc={article.news_summary_short}
                imageURL={article.image_url}
                newsUrl={article.site_url}
              />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );  
};

export default NewsComponent;
