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

var mostUsedWords = "";

const App = () => {
  const [videosMetaInfo, setVideosMetaInfo] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [selectedVideoDesc, setSelectedVideoDesc] = useState(null);
  const [selectedVideoComment, setSelectedVideoComment] = useState([]);
  const [show, setShow] = useState(true);
  const [word, setWord] = useState([]);
  const num = 10;
  let words = "";

  const handleToggle = (e) => {
    setShow(!show);
  };

  useLayoutEffect((e) => {
    onSearch("RickRoll");
  }, []);

  useEffect(() => {
    onClick();
  }, [selectedVideoId]);

  useEffect(() => {
    words = word
      .toString()
      .toLowerCase()
      .replace(/[&/\\#,+()$~%.'":*?<>{}!0-9 ] /g);
    mostUsedWords = findMostFrequent(words, num).toString();
  }, [word]);

  useEffect(() => {
    setWord(
      selectedVideoComment.map((item) => {
        return item.snippet.topLevelComment.snippet.textDisplay;
      })
    );
  }, [selectedVideoComment]);

  const findMostFrequent = (words = "", num = 1) => {
    const strArr = words.split(" ");
    const map = {};
    strArr.forEach((word) => {
      if (map.hasOwnProperty(word)) {
        map[word]++;
      } else {
        map[word] = 1;
      }
    });
    const frequencyArr = Object.keys(map).map((key) => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    return frequencyArr.slice(0, num).map((el) => el[0]);
  };
  let buffer = [];
  buffer.push(
    <div style={{ marginLeft: 340, marginRight: 100, marginBottom: 50 }}>
      <h4>Most used words are: {mostUsedWords}</h4>
    </div>
  );

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
    setShow(false);
  };

  const onClick = async () => {
    const response = await youtubeApi.get("/commentThreads", {
      params: {
        maxResults: 100,
        videoId: selectedVideoId,
      },
    });
    setSelectedVideoComment(response.data.items);
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
      <br />
      <div>{show && buffer}</div>
      <CommentsList selectedVideoComment={selectedVideoComment} />
      <br />
    </div>
  );
};

export default App;
