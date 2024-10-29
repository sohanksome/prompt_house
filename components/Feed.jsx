'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [posts, setposts] = useState([]);
  const [searchResult, setsearchResult] = useState([]);

  const handleSearchChange = (e) => {
    const searchterm = e.target.value
    setsearchText(searchterm);
    setsearchResult(
      posts.filter(
        (p) =>
          p.prompt.toLowerCase().includes(searchterm.toLowerCase()) ||
          p.tag.toLowerCase().includes(searchterm.toLowerCase()) ||
          p.creator.username.toLowerCase().includes(searchterm.toLowerCase())
      )
    );
  };



  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setposts(data);
      setsearchResult(data); // Initialize searchResult with full data
    };

    fetchPosts();
  }, []); // Empty dependency array so it only runs once on mount


  const handleTagClick = (tag) => {
    setsearchText(tag)
    setsearchResult(posts.filter(p => p.tag === tag))
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={searchText ? searchResult : posts} // Show filtered results or full list
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
