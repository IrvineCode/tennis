import React from 'react';

const Post = (props) => {
    const post = props.post;
    const onDelete = props.onDelete;

	return (
		<div className="posting" key={post.id}>
			<div style={{ color: post.tempId ? 'salmon' : 'dodgerblue' }}>{post.id}</div>
			<span>{post.data().title}</span>
			<span>- {post.data().name}</span>
			<button
				onClick={() => {
					onDelete(post.id);
				}}
				disabled={post.tempId}
			>
				DELETE
			</button>
		</div>
	);
};

export default Post;