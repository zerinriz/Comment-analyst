import React from "react";
import { Comment } from "semantic-ui-react";

function Comments({ auth, time, text, likes, image, index }) {
  return (
    <Comment style={{ maxWidth: 1500 }}>
      <Comment.Avatar src={image} />
      <Comment.Content>
        <Comment.Author>{auth}</Comment.Author>
        <Comment.Metadata>
          <div>{time}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        {likes} likes
      </Comment.Content>
    </Comment>
  );
}

export default Comments;
