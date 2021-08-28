/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useLayoutEffect, useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import SearchBar from "./components/SearchBar";
import youtubeApi from "./api/youtube";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import { Button, Segment } from "semantic-ui-react";
import CommentsList from "./components/CommentsList";

const App = () => {
  const [videosMetaInfo, setVideosMetaInfo] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [selectedVideoDesc, setSelectedVideoDesc] = useState(null);
  const [selectedVideoComment, setSelectedVideoComment] = useState([]);
  const [show, setShow] = useState(false);

  let buffer = [];
  buffer.push(<CommentsList selectedVideoComment={selectedVideoComment} />);

  const handleToggle = () => {
    setShow(!show);
  };

  useLayoutEffect(() => {
    onSearch("RickRoll");
  }, []);

  useEffect(() => {
    onClick();
  }, [selectedVideoId]);

  const onVideoSelected = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const onTitleSelected = (videoTitle) => {
    setSelectedVideoTitle(videoTitle);
  };

  const onDescSelected = (videoDesc) => {
    setSelectedVideoDesc(videoDesc);
  };

  const onSearch = async (keyword) => {
    const response = await youtubeApi.get("/search", {
      params: {
        q: keyword,
      },
    });
    setVideosMetaInfo(response.data.items);
    setSelectedVideoId(response.data.items[0].id.videoId);
    setSelectedVideoTitle(response.data.items[0].snippet.title);
    setSelectedVideoDesc(response.data.items[0].snippet.description);
  };

  const onClick = async () => {
    const response = await youtubeApi.get("/commentThreads", {
      params: {
        maxResults: 100,
        videoId: selectedVideoId,
      },
    });
    setSelectedVideoComment(response.data.items);
    console.log(selectedVideoComment);
  };

  return (
    <div className="App">
      <Segment basic inverted padded="very" textAlign="center">
        <h1>Video Browser</h1>
      </Segment>
      <Segment textAlign="center">
        <SearchBar onSearch={onSearch} />
      </Segment>
      <VideoList
        onDescSelected={onDescSelected}
        onTitleSelected={onTitleSelected}
        onVideoSelected={onVideoSelected}
        data={videosMetaInfo}
      />
      <VideoDetail
        videoDesc={selectedVideoDesc}
        videoId={selectedVideoId}
        videoTitle={selectedVideoTitle}
      />
      <Button style={{ margin: 50 }} onClick={handleToggle}>
        Analyze Comments
      </Button>
      <div>{show && buffer}</div>
      <br />
    </div>
  );
};

export default App;
