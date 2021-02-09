import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Like_button from "../Like"  
import Comment from "../Comment";

import { 
    Card,
    Button,
    Form
} from 'react-bootstrap';

export const Post_Card_Img = props => (
    <img src={"/static/" + props.img.url}/>
)

const Post_Card = props => (
    
    <div className = "Post_Card">

        <Card>
                
            <Card.Body>

                <Card.Text>
                    제목 : <b> {props.Post_title} </b>
                    <hr/>
                    내용 : {props.Post_text} <br/>
                    이미지 : {props.Post_img_loader()}
                </Card.Text>

                <Like_button/>

                <small className="text-muted">
                    Time : {props.Post_date}
                </small>

            </Card.Body>

            <Card.Footer>
                
                <Comment/> 

            </Card.Footer>
        </Card>
    
    </div>

);

export default Post_Card;