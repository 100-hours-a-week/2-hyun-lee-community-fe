import { renderPosts} from '../components/post-component.js';
import { fetchPosts } from '../api/api.js';
import { checkAuth } from '../utils/auth-check.js';


document.getElementById('createBtn').addEventListener('click', () => {
    window.location.href = 'create-post'; 
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const isAuthenticated =await checkAuth();
        if(!isAuthenticated) return;
        const result = await fetchPosts();
        console.log("result: ",result);
        if(Array.isArray(result.posts) && result.posts.length !== 0){
            renderPosts(result.posts); 
        }
    } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
});


