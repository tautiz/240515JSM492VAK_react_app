async function fetchMultipleData() {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments'),
        ]);

        const users = await usersResponse.json();
        const posts = await postsResponse.json();
        const comments = await commentsResponse.json();

        console.log('Users:', users);
        console.log('Posts:', posts);
        console.log('Comments:', poscommentsts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchMultipleData();