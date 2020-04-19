import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}){
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
}

function RenderComments({comments}){
    const commentList = comments.map((comment) => {   
        return (
            <div key={comment.id}>
                
                    <li>{comment.comment}</li>
                    <br/>
                    <li>
                            -- {comment.author}
                                {" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                }).format(new Date(Date.parse(comment.date)))}

                    </li>
                    <br/>
            </div>
            );
        });

        return (

            <div>
                <h4> Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
            </div>
        );
}
const Dishdetail=(props)=>{

        return(
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {props.dish
                        ?
                            <RenderDish dish={props.dish}/>
                            
                        :
                            <div></div>
                        }
                    </div>
                 <div className="col-12 col-md-5 m-1">
                     {props.dish
                    ?
                        <RenderComments comments={props.dish.comments}/>
                    
                    :
                        <div></div>
                    }
                </div>
            </div>
            </div>
        );
}

export default Dishdetail;