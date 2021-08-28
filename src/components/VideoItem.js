import React from "react";
import { Image, Segment } from "semantic-ui-react";

function selectVideo(
  videoIdObj,
  onVideoSelected,
  videoSnippet,
  onTitleSelected,
  onDescSelected
) {
  onDescSelected(videoSnippet.description);
  onVideoSelected(videoIdObj.videoId);
  onTitleSelected(videoSnippet.title);
  console.log(videoSnippet);
}

function constructVideoTitles(
  vidoesData,
  onVideoSelected,
  onTitleSelected,
  onDescSelected
) {
  return vidoesData.map(({ snippet, id }, index) => {
    return (
      <Segment
        size="mini"
        key={index}
        onClick={() =>
          selectVideo(
            id,
            onVideoSelected,
            snippet,
            onTitleSelected,
            onDescSelected
          )
        }
      >
        <Image
          centered
          size="large"
          src={snippet.thumbnails.high.url}
          key={index}
        />
        <h5>{snippet.title}</h5>
      </Segment>
    );
  });
}
const VideoItem = ({
  data,
  onVideoSelected,
  onTitleSelected,
  onDescSelected,
}) => {
  return (
    <>
      {constructVideoTitles(
        data,
        onVideoSelected,
        onTitleSelected,
        onDescSelected
      )}
    </>
  );
};

export default VideoItem;
