import React, { useEffect, useState } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import Home from "./assets/home.svg";
import Saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";

function App() {
  const [Question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CO_API_KEY = "viyDnWpdTE7ArmUDo28sUZIJvIfjx7jZMKN5Pbua";

  // Save chat history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);
  // Load chat history from local storage on mount
  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.cohere.com/v1/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CO_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: Question,
          connectors: [{ id: "web-search" }],
        }),
      });
      const data = await res.json();
      const chatbotResponse = data.chat_history.find(
        (msg) => msg.role === "CHATBOT"
      );

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "USER", message: Question },
        { role: "CHATBOT", message: chatbotResponse.message },
      ]);
      setQuestion("");
      console.log(data);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(chatHistory);
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="new chat" className="addBtn" /> New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="query" /> What is Programming ?
            </button>
            <button className="query">
              <img src={msgIcon} alt="query" /> How to use an API ?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={Home} alt="" /> Home
          </div>
          <div className="listItems">
            <img src={Saved} alt="" /> Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" /> Upgrade To Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat ${chat.role === "CHATBOT" ? "bot" : ""}`}
            >
              <img
                className="chatImg"
                src={chat.role === "CHATBOT" ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{chat.message}</p>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={Question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <button
              className="send"
              onClick={() => {
                handleGenerate();
              }}
              disabled={isLoading}
            >
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT August 20 Version
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
