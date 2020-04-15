import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props);
    }

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
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        
        const commentList = this.props.dish.comments.map((comment) => {   
        var d=new Date(comment.date);
        
        return (
            <div key={comment.id}>
                
                    <li>
                        {comment.comment}
                    </li>
                    <br/>
                    <li>
                        -- {comment.author}  {monthNames[d.getMonth()]} {("0" + d.getDate()).slice(-2)},{d.getFullYear()}
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
        );
    }
}

export default Dishdetail;