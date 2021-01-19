/**
 *  피드 관련 라우트
 */
var express = require('express');
var router = express.Router();

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostService } from "../services/PostService";

import { CreatePostDTO, UpdatePostDTO } from '../Models/DTOs/PostDTO';
import { CreateImageDTO } from "../Models/DTOs/ImageDTO";


/**
 * 피드 보기
 */
router.get('/', function(req, res) {
    const feed_Info = req.body;

});

/**
 * 피드 생성
 */
router.post(
  '/', 
  VerifyAccessToken,
  async function(req, res) {
    const feed_Info = req.body;

    const pk = res.locals.jwt_payload.pk;

    const PostDTO = new CreatePostDTO();        //피드 생성 DTO
    const ImgDTO = new CreateImageDTO();
    
    const Post_Create = new PostService();

    PostDTO.title = feed_Info.title;
    PostDTO.text_content = feed_Info.content; //DTO에 요청받은 데이터 삽입
    ImgDTO.url = feed_Info.url;

    const Create_feed = await Post_Create.CreatePost(
      pk, 
      PostDTO, 
      null  //잘못됨
    );

    if(!Create_feed){
      return res.state(403).send({
        status : 403,
        success : true,
        message : "Forbidden"
      });
    }

    return res.status(200).send({
      status : 200,
      success : true,
      message : "success"
    });
});

/**
 * 피드 수정
 */
router.put(
  '/:feednum',
  VerifyAccessToken,
  async function(req, res) { 
  const feed_Info = req.body;
  const pk = res.locals.jwt_payload.pk;

  const Post_Update_DTO = new UpdatePostDTO();
  Post_Update_DTO.title = feed_Info.title;
  Post_Update_DTO.text_content = feed_Info.text_content;

  const ImgDTO = new CreateImageDTO();
  ImgDTO.url = feed_Info.url;

  const Post_Update = new PostService();

  const Update_Feed = await Post_Update.UpdatePost(
    pk,
    feed_Info.post_pk,
    Post_Update_DTO,
    ImgDTO,
    null
  )

  if(!Update_Feed){
    return res.state(403).send({
      status : 403,
      success : true,
      message : "Forbidden"
    });
  }

  return res.status(200).send({
    status : 200,
    success : true,
    message : "success"
  });
});

/*
 * 피드 삭제 
 */  
router.delete(
  '/:feednum', 
  async function(req, res) {
  const feed_Info = req.body;
  const Feed_pk = feed_Info.post_pk;
  const pk = res.locals.jwt_payload.pk;

  const Feed_Delete = new PostService();

  const Delete_Feed = await Feed_Delete.DeletePost(
    pk,
    Feed_pk
  )

  return res.status(200).send({
    status : 200,
    success : true,
    message : "success"
  });
});

module.exports = router;