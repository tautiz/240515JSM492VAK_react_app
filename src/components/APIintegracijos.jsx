import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Dinaminis Užklausų Valdymas
function DynamicQuery() {
    const [category, setCategory] = useState('posts');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${category}`);
            setData(response.data);
        };
        fetchData();
    }, [category]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-center gap-4 mb-6">
                <button 
                    onClick={() => setCategory('posts')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Load Posts
                </button>
                <button 
                    onClick={() => setCategory('comments')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Load Comments
                </button>
                <button 
                    onClick={() => setCategory('users')} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Load Users
                </button>
            </div>
            <ul className="space-y-3">
                {data.map(item => (
                    <li key={item.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {item.title || item.name || item.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 2. Paieškos Filtras su API
function SearchFilter() {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <ul className="space-y-3">
                {filteredPosts.map(post => (
                    <li key={post.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 3. Duomenų Kūrimas ir Parodymas
function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, body };
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        setPosts([response.data, ...posts]);
        setTitle('');
        setBody('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Add Post
                </button>
            </form>
            <ul className="space-y-3">
                {posts.map(post => (
                    <li key={post.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 4. Puslapiavimas
function Pagination() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
            setPosts(response.data);
        };
        fetchPosts();
    }, [page]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-center gap-4 mb-6">
                <button 
                    onClick={() => setPage(page > 1 ? page - 1 : page)} 
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={posts.length < 10}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
            <ul className="space-y-3">
                {posts.map(post => (
                    <li key={post.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 5. Susietų API Duomenų Valdymas
function PostWithComments() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const fetchComments = async (postId) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
        setSelectedPostId(postId);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                        <button 
                            onClick={() => fetchComments(post.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                        >
                            View Comments
                        </button>
                        {selectedPostId === post.id && (
                            <ul className="mt-4 space-y-2 pl-4 border-l-2 border-blue-200">
                                {comments.map(comment => (
                                    <li key={comment.id} className="text-gray-600 bg-gray-50 p-3 rounded-md text-sm">
                                        {comment.body}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { DynamicQuery, SearchFilter, CreatePost, Pagination, PostWithComments };