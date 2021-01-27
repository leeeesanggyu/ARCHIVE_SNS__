/**
 *  게시물 좋아요 관련 라우트
 */
import express, { Request, Response } from "express";
var router = express.Router();

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { CommentLikeService } from "../services/LikeService";

/**
 * 결과 처리
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = (result, res) => {
    if(!result){
        return res.status(403).send({
            status : 403,
            success : true,
            message : "Forbidden"
        });
    };
    return res.status(200).send({
        status : 200,
        success : true,
        message : "success"
    });  
}

/**
 * 좋아요 수 보기
 * 
 * @param comment_pk : target_pk
 */
router.get(
    '/count',
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.comment_pk;

    const comment_Like = new CommentLikeService();
    const Count_Like = comment_Like.CountLike(
        target_pk
    );

    return status(Count_Like, res);
});

/**
 * WhoLike
 * 
 * @param comment_pk : target_pk
 * @param limit : 
 */
router.get(
    '/userlist/:feedNum', 
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.comment_pk;
    const limit = like_Info.limit;

    const comment_Like = new CommentLikeService();
    const Who_Like = comment_Like.WhoLike(
        target_pk,
        limit
    );
    
    return status(Who_Like, res);
});

/**
 * ToggleLike 
 * 
 * @param user_pk : jwt tokken
 * @param comment_pk : 
 */
router.post(
    '/:commentNum', 
    VerifyAccessToken,
    async (req, res) => {
    const like_Info = req.body;

    const comment_pk = like_Info.comment_pk;
    const user_pk = res.locals.jwt_payload.pk;

    const Comment_Like = new CommentLikeService();
    const CommentLike = await Comment_Like.ToggleLike(
        user_pk,
        comment_pk
    );
    return status(CommentLike, res);
});

module.exports = router;