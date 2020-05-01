import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	Row,
	Col,
	Label,
	Container,
	ModalBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}
	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.name,
			values.comment
		);
	}
	render() {
		return (
			<React.Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className='fa fa-pencil fa-md'></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<Container>
							<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
								<Row className='form-group'>
									<Col xs={12}>
										<Label htmlFor='Rating'>Rating</Label>
									</Col>
									<Col xs={12}>
										<Control.select
											model='.rating'
											id='rating'
											name='rating'
											className='form-control'
										>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Control.select>
									</Col>
								</Row>
								<Row className='form-group'>
									<Col xs={12}>
										<Label htmlFor='name'>Your Name</Label>
									</Col>
									<Col xs={12}>
										<Control.text
											model='.name'
											id='name'
											placeholder='Your Name'
											name='name'
											className='form-control'
											validators={{
												required,
												minLength: minLength(3),
												maxLength: maxLength(15),
											}}
										></Control.text>
										<Errors
											className='text-danger'
											model='.name'
											show='touched'
											messages={{
												required: 'Required',
												minLength: 'Must be greater than 2 characters',
												maxLength: 'Must be 15 characters or less',
											}}
										/>
									</Col>
								</Row>
								<Row className='form-group'>
									<Col xs={12}>
										<Label htmlFor='name'>Comment</Label>
									</Col>
									<Col xs={12}>
										<Control.textarea
											model='.comment'
											id='comment'
											name='comment'
											rows='6'
											className='form-control'
										></Control.textarea>
									</Col>
								</Row>
								<Row className='form-group'>
									<Col>
										<Button type='submit' value='submit' color='primary'>
											Submit
										</Button>
									</Col>
								</Row>
							</LocalForm>
						</Container>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

function RenderDish({ dish }) {
	return (
		<FadeTransform
			in
			transformProps={{
				exitTransform: 'scale(0.5) translateY(-50%)',
			}}
		>
			<Card>
				<CardImg top src={baseUrl + dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function RenderComments({ comments, postComment, dishId }) {
	return (
		<div>
			<h4> Comments</h4>
			<ul className='list-unstyled'>
				<Stagger in>
					{comments.map((comment) => {
						return (
							<Fade in>
								<li key={comment.id}>
									<p>{comment.comment}</p>
									<p>
										-- {comment.author} ,{' '}
										{new Intl.DateTimeFormat('en-US', {
											year: 'numeric',
											month: 'short',
											day: '2-digit',
										}).format(new Date(Date.parse(comment.date)))}
									</p>
								</li>
							</Fade>
						);
					})}
				</Stagger>
				;
			</ul>
			<CommentForm dishId={dishId} postComment={postComment} />
		</div>
	);
}
const Dishdetail = (props) => {
	if (props.isLoading) {
		return (
			<div className='container'>
				<div className='row'>
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className='container'>
				<div className='row'>
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null) {
		return (
			<div className='container'>
				<div className='row'>
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to='/menu'>Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className='col-12'>
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className='row'>
					<div className='col-12 col-md-5 m-1'>
						<RenderDish dish={props.dish} />
					</div>
					<div className='col-12 col-md-5 m-1'>
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				</div>
			</div>
		);
	}
};

export default Dishdetail;
