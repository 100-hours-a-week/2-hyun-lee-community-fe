import { renderPosts} from '../components/post-component.js';
import { fetchPosts } from '../api/api.js';



document.getElementById('createBtn').addEventListener('click', () => {
    window.location.href = 'create-post'; 
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const result = await fetchPosts();
        if(Array.isArray(result.posts) && result.posts.length !== 0){
            renderPosts(result.posts); 
        }
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
});


