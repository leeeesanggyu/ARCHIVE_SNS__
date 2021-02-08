import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Like_button from "../Like"  
import Comment from "../Comment";
// import getComment from "../getComment";

import { 
    Card,
    Button,
    Form
} from 'react-bootstrap';
import getComment from '../getComment/presenter';

const Post_Card = props => (
    
    <div className = "Post_Card">

        <Card>
            {/* <Card.Img 
                variant="top" 
                img src="/" onError="this.style.display='none'" alt='' 
                /> */}
                
            <Card.Body>
                <Card.Text>
                    <b> {props.Post_title} </b>
                    <hr/>
                        {props.Post_img}
                        {props.Post_content}
                </Card.Text>

                <Like_button/>

                <small className="text-muted">
                    Time : {props.Post_date}
                </small>

            </Card.Body>

            <Card.Footer>
                
                {/* <getComment/>  */}

            </Card.Footer>
        </Card>
    
    </div>

);

export default Post_Card;