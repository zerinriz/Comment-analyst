import React from "react";
import { Container, Comment, Header } from "semantic-ui-react";
import Comments from "./Comments";

function CommentsList({ selectedVideoComment }) {
  return (
    <Container textAlign="center">
      {selectedVideoComment.map((item) => (
        <Comment.Group>
          <Header as="h4" dividing textAlign="center">
            <Comments
              index={item.id}
              text={item.snippet.topLevelComment.snippet.textDisplay}
              likes={item.snippet.topLevelComment.snippet.likeCount}
              auth={item.snippet.topLevelComment.snippet.authorDisplayName}
              image={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              time={item.snippet.topLevelComment.snippet.publishedAt}
            />
          </Header>
        </Comment.Group>
      ))}
    </Container>
  );
}

export default CommentsList;
