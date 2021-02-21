/**
 * 프로필 관련 라우트
 */
import { Response } from "express";
import {
    JsonController,
    Get,
    Param,
    Body,
    Post,
    Put,
    UseBefore,
    Req,
    Res,
    Delete,
    HttpCode,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";import sanitizeHtml from 'sanitize-html';

import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { AccountService } from '../Services/AccountService';
import { Account } from '../Models/Entities/Account';
import { AccountDTO } from '../Models/DTOs/AccountDTO';

@JsonController("/profile")
export class ProfileControl {
    constructor( private account_service : AccountService ) {}

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "GetAccountByPk",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetAccountByPk(
        @Req() req,
        @Res() res: Response
    ) {
        const GetAccount_Result = await this.account_service.GetAccountByPK(
            req.body.email
        );

        if(!GetAccount_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : GetAccount_Result };
    }

    @HttpCode(200)
    @Put()
    @OpenAPI({
        summary: "UpdateAccount",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async UpdateAccount(
        @Body() Account_DTO: AccountDTO,
        @Req() req,
        @Res() res: Response
    ) {
        const Update_Profile_result = await this.account_service.UpdateAccount(
            req.body.account_pk,
            Account_DTO
        );

        if(!Update_Profile_result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : Update_Profile_result };
    }

}
