const postModel = require('../models/post'); // 게시글 모델 임포트
const { STATUS_CODE, STATUS_MESSAGE } = require('../utils/status'); // 상태 코드 및 메시지 임포트

// 게시글 목록 조회
exports.getPosts = async (request, response, next) => {
    const { offset, limit } = request.query;

    try {
        // offset과 limit 유효성 검사
        if (!offset || !limit) {
            const error = new Error(STATUS_MESSAGE.INVALID_OFFSET_OR_LIMIT);
            error.status = STATUS_CODE.BAD_REQUEST;
            throw error;
        }

        const requestData = {
            offset: parseInt(offset, 10), // 쿼리 파라미터를 정수로 변환
            limit: parseInt(limit, 10),
        };

        // 게시글 조회 모델 호출
        const responseData = await postModel.getPosts(requestData);

        // 결과가 없을 경우 처리
        if (!responseData || responseData.length === 0) {
            const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
            error.status = STATUS_CODE.NOT_FOUND;
            throw error;
        }

        // 성공적인 응답 반환
        return response.status(STATUS_CODE.OK).json({
            message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
            data: responseData,
        });
    } catch (error) {
        next(error); // 오류 처리 미들웨어로 전달
    }
};
