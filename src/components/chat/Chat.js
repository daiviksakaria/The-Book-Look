import React, { Component, useState, useEffect } from "react";
import { fire } from "../../firebase";
import $ from "jquery";
import "./chat-styles.css";

const db = fire.firestore();

const Chat = ({ loggedIn }) => {
  const [users, setUsers] = useState(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [user2ID, setUser2ID] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const user1ID = fire.auth().currentUser.uid;
  const [searchUsers, setSearchUsers] = useState([]);

  /*  useEffect(() => {
    $(document).ready(function () {
      $(".hide-chat-box").click(function () {
        $(".chat-content").slideToggle();
      });
    });
  }, []); */

  useEffect(() => {
    let usersCon = [];
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id != user1ID) {
          usersCon.push({ ...doc.data(), id: doc.id });
          // console.log("chat");
        }
      });

      const arr = [];
      if (usersCon) {
        usersCon = usersCon.filter((doc) => {
          if (arr.includes(doc.id)) {
            return false;
          } else {
            arr.push(doc.id);
            return true;
          }
        });
      }
      setUsers(usersCon);
      let userSearchCon = [];
      const searchText = search !== "" ? search.toLowerCase() : "";
      console.log(usersCon);
      if (search == null || search == "") {
        setSearchUsers(usersCon);
      } else {
        userSearchCon = [];
        for (var i = 0; users && i < users.length; i++) {
          const userName = users[i].name;
          if (userName.toLowerCase().indexOf(searchText) > -1) {
            userSearchCon.push(users[i]);
            //console.log("hi");
          }
        }
        setSearchUsers(userSearchCon);
        //console.log(userSearchCon);
      }
    });
  }, [search]);

  console.log(users);
  console.log(searchUsers);

  const User = (props) => {
    const { user, onClick } = props;

    return (
      <a
        onClick={() => onClick(user)}
        className="list-group-item list-group-item-action ative text-whte rounded-0"
      >
        <div className="media">
          <img
            src={
              user.url ||
              "https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
            }
            alt="user"
            width="45"
            height="45"
            className="rounded-circle"
          />
          <div className="media-body ml-4">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h6 className="mb-0 mt-3">{user.name}</h6>
              {/* <span className="mb-0 mt-3">
                {user.isOnline ? "online" : "offline"}
              </span> */}

              <span
                className={
                  user.isOnline
                    ? "mb-0 mt-3 online-status"
                    : "mb-0 mt-3 online-status-off"
                }
              ></span>

              {/* <small className="small font-weight-bold">25 Dec</small> */}
            </div>
            {/* <p className="font-italic mb-0 text-small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p> */}
          </div>
        </div>
      </a>
    );
  };

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(user.name);
    setUser2ID(user.id);

    //console.log(user);

    getRealtimeConversations({ uid_1: user1ID, uid_2: user.id });
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      db.collection("conversations")
        .add({
          user_uid_1: user1ID,
          user_uid_2: user2ID,
          message,
          isView: false,
          createdAt: new Date(),
        })
        .then((data) => {
          // console.log(data);
        })
        .then(() => {
          setMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getRealtimeConversations = (user) => {
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        let conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 == user.uid_1 &&
              doc.data().user_uid_2 == user.uid_2) ||
            (doc.data().user_uid_1 == user.uid_2 &&
              doc.data().user_uid_2 == user.uid_1)
          ) {
            conversations.push(doc.data());
          }
        });
        console.log(conversations);
        setConversations(conversations);
      });
  };

  return (
    <div className="container py-5 px-4 chat-container">
      <div className="row rounded-lg overflow-hidden shadow">
        {/* Users box */}
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              {/* <p className="h5 mb-0 py-1">Recent</p> */}
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                name="search"
                value={search}
                id="search"
              ></input>
            </div>

            <div className="messages-box">
              <div className="list-group rounded-0">
                {searchUsers
                  ? searchUsers.map((user) => {
                      return (
                        <User key={user.uid} user={user} onClick={initChat} />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        <div className="col-7 px-0">
          <div className="bg-gray px-4 py-2 bg-light">
            {chatStarted ? (
              <p className="h5 mb-0 py-1">{chatUser}</p>
            ) : (
              <p className="h5 mb-0 py-1"> Chat</p>
            )}
          </div>

          <div className="px-4 py-2 chat-box bg-white message-section">
            {/* {chatStarted
              ? conversations.map((conv) => {
                  conv.user_uid_1 == user1ID ? (
                    <div className="media w-50 mb-3">
                      <img
                        src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                        alt="user"
                        width="50"
                        className="rounded-circle"
                      />
                      <div className="media-body ml-3">
                        <div className="bg-light rounded py-2 px-3 mb-2">
                          <p className="text-small mb-0 text-muted">
                            {conv.message}
                          </p>
                        </div>
                        <p className="small text-muted">12:00 PM | Aug 13</p>
                      </div>
                    </div>
                  ) : (
                    <div className="media w-50 ml-auto mb-3">
                      <div className="media-body">
                        <div className="bg-primary rounded py-2 px-3 mb-2">
                          <p className="text-small mb-0 text-white">
                            {conv.message}
                          </p>
                        </div>
                        <p className="small text-muted">12:00 PM | Aug 13</p>
                      </div>
                    </div>
                  );
                })
              : null} */}

            <div className="messageSections">
              {chatStarted
                ? conversations.map((con) => (
                    <div
                      style={{
                        textAlign: con.user_uid_1 == user1ID ? "right" : "left",
                      }}
                    >
                      <p
                        className="messageStyle"
                        style={{
                          background:
                            con.user_uid_1 == user1ID
                              ? "#1643e2"
                              : "rgb(219, 219, 219)",
                          color: con.user_uid_1 == user1ID ? "white" : "black",
                        }}
                      >
                        {con.message}
                      </p>
                    </div>
                  ))
                : null}
            </div>
          </div>

          {/* <!-- Typing area -->  */}
          {chatStarted ? (
            <div className="chat-controls">
              <form action="#" className="bg-light">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Type a message"
                    aria-describedby="button-addon2"
                    className="form-control rounded-0 border-0 py-4 bg-light"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      id="button-addon2"
                      type="submit"
                      className="btn btn-link"
                      onClick={submitMessage}
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Chat;
