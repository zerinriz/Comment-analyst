import React from "react";
import { Embed, Segment } from "semantic-ui-react";

const VideoDetail = ({ videoId, videoTitle, videoDesc }) => {
  return (
    <div className="video">
      <Embed
        className="video-player"
        active
        source="youtube"
        iframe={`https://www.youtube.com/embed/${videoId}`}
      />
      <div className="title-desc">
        <Segment size="small" style={{ marginLeft: 340, marginRight: 100 }}>
          <h3>{videoTitle}</h3>
          <h4>{videoDesc}</h4>
        </Segment>
      </div>
    </div>
  );
};

export default VideoDetail;
