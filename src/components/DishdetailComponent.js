import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component{

    renderDish(){
        return(
            <Card>
                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }



    renderComments(){
        const commentList = this.props.dish.comments.map((comment) => {   
        return (
            <div key={comment.id}>
                
                    <li>
                        
                            {comment.comment}
                            
                    </li>
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

    render(){
        return(
            <div className="container">
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.props.dish
                    ?
                        this.renderDish()
                    
                    :
                        <div></div>
                    }
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.props.dish
                    ?
                        this.renderComments()
                    
                    :
                        <div></div>
                    }
                </div>
            </div>
            </div>
        );
    }
}

export default Dishdetail;