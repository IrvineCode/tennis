import React, { Component } from 'react';
import './App.css';
import { db } from './utils/db';
import Post from './components/Post';

class Main extends Component {
	constructor() {
		super();
		this.state = {
			postings: [],
			titleInput: ''
		};
	}
	componentDidMount() {
		this.list();
	}
	list() {
		db.collection('postings').get().then((snapshot) => {
			this.setState({
				postings: snapshot.docs,
				titleInput: ''
			});
		});
	}
	onDelete(id) {
		this.setState({
			postings: this.state.postings.filter((p) => p.id !== id)
		});

		db.collection('postings').doc(id).delete();
	}
	onAdd() {
		let data = {
			title: this.state.titleInput,
			name: 'daniel'
		};

		let newPost = {
			id: new Date().getTime(),
			tempId: true,
			data: () => data
		};

		this.setState({
			postings: [ ...this.state.postings, newPost ]
		});

		db.collection('postings').add(data).then((docref) => {
			let newPostings = this.state.postings.map((p) => {
				if (p.id === newPost.id) {
					let newPost = { ...p };
					newPost.id = docref.id;
					newPost.tempId = false;
					return newPost;
				} else return p;
			});

			this.setState({ postings: newPostings });
		});
	}
	render() {
		return (
			<div className="App">
				
				<h1>Tennis App</h1>

				{this.state.postings.map((post) => <Post key={post.id} post={post} onDelete={this.onDelete.bind(this)} />)}

				<div className="form">
					<input
						type="text"
						value={this.state.titleInput}
						onChange={(event) => {
							this.setState({ titleInput: event.target.value });
						}}
					/>
					<button onClick={this.onAdd.bind(this)}>ADD</button>
				</div>
			</div>
		);
	}
}

export default Main;
