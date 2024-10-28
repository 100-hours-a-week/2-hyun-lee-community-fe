const db=require('../config/db');

const Post = {
    // 게시글 목록 조회
    getPosts: async (requestData) => {
        const { offset, limit } = requestData;
        const sql = `
            SELECT
                board.board_id,
                board.page_title,
                board.page_content,
                board.create_at,
                board.user_fk,
                user.nickname,
                board.lies_count,
                board.view_count
            FROM board
            LEFT JOIN user ON board.user_fk = user.user_id
            WHERE board.deleted_at IS NULL
            ORDER BY board.create_at DESC
            LIMIT ? OFFSET ?;
        `;

        try {
            // 쿼리 실행
            const results = await query(sql, [limit, offset]);
            return results;
        } catch (error) {
            throw new Error('게시글 조회 실패: ' + error.message);
        }
    },

    // 추가적인 게시글 관련 메서드 작성 가능
};

module.exports=Post;