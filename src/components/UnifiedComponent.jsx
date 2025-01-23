import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UnifiedComponent() {
    const [category, setCategory] = useState('posts');
    const [data, setData] = useState([]);
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    // Unified data fetching
    useEffect(() => {
        const fetchData = async () => {
            const url = category === 'posts'
                ? `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
                : category === 'users'
                    ? 'https://jsonplaceholder.typicode.com/users'
                    : 'https://jsonplaceholder.typicode.com/comments';

            const response = await axios.get(url);
            setData(response.data);
        };
        fetchData();
    }, [category, page]); // Added page dependency

    // Search handler
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.body?.toLowerCase().includes(search.toLowerCase()) ||
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    // Handle category change
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1); // Reset page on category change
    };

    // Handling new post submission
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        setData([response.data, ...data]);
        setNewPost({ title: '', body: '' });
        setSearch('');
    };

    // Fetch comments for a post
    const fetchComments = async (postId) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex gap-2 mb-4">
                <button className="btn bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleCategoryChange('posts')}>Load Posts</button>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleCategoryChange('users')}>Load Users</button>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleCategoryChange('comments')}>Load Comments</button>
            </div>

            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded mb-4 w-full"
            />

            <div className="space-y-4">
                {category === 'posts' && (
                    <>
                        <form onSubmit={handlePostSubmit} className="mb-4">
                            <input
                                type="text"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                placeholder="Title"
                                className="p-2 border border-gray-300 rounded w-full mb-2"
                            />
                            <textarea
                                value={newPost.body}
                                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                                placeholder="Body"
                                className="p-2 border border-gray-300 rounded w-full mb-2"
                            />
                            <button type="submit" className="btn bg-green-500 text-white hover:bg-green-600">Add Post</button>
                        </form>
                        <div className="space-y-2">
                            {filteredData.length > 0 ? (
                                filteredData.map(post => (
                                    <div key={post.id} className="p-4 bg-white rounded shadow-md">
                                        <h3 className="font-bold">{post.title}</h3>
                                        <p>{post.body}</p>
                                        <button
                                            onClick={() => fetchComments(post.id)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            View Comments
                                        </button>
                                        {comments.length > 0 && post.id === comments[0].postId && (
                                            <ul className="ml-4 mt-2 space-y-2">
                                                {comments.map(comment => (
                                                    <li key={comment.id} className="bg-gray-100 p-2 rounded">
                                                        <p>{comment.body}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No results found</p>
                            )}
                        </div>
                    </>
                )}

                {category === 'users' && (
                    <ul className="space-y-2">
                        {filteredData.map(user => (
                            <li key={user.id} className="p-4 bg-white rounded shadow-md">
                                <h3 className="font-bold">{user.name}</h3>
                                <p>{user.email}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {category === 'comments' && (
                    <ul className="space-y-2">
                        {filteredData.map(comment => (
                            <li key={comment.id} className="p-4 bg-white rounded shadow-md">
                                <h3 className="font-bold">{comment.name}</h3>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {category === 'posts' && (
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : page)}
                        disabled={page === 1}
                        className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={data.length < 10}
                        className="btn bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default UnifiedComponent;
