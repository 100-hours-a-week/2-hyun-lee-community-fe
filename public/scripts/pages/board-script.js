import { renderPosts} from '../components/post-component.js';
import { fetchPosts } from '../api/api.js';


const dummyPosts = [
    [
        {
            board_id: 1,
            page_title: '첫 번째 게시글',
            likes_count: 10,
            comment_count: 5,
            view_count: 100,
            create_at: '2024-11-08T12:00:00Z',
            profile: 'https://via.placeholder.com/36',
            nickname: 'User1'
        },
        {
            board_id: 2,
            page_title: '두 번째 게시글',
            likes_count: 20,
            comment_count: 10,
            view_count: 200,
            create_at: '2024-11-08T13:00:00Z',
            profile: 'https://via.placeholder.com/36',
            nickname: 'User2'
        }
    ]
];


document.getElementById('createBtn').addEventListener('click', () => {
    window.location.href = '/public/create-post.html'; 
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await fetchPosts();
        renderPosts(posts); 
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
});

