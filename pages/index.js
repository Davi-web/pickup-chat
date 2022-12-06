import React, { useContext, useEffect } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

const Auth = () => {
  const { username, setUsername, secret, setSecret } = useContext(Context);

  const router = useRouter();
  useEffect(() => {
    if (
      router.query.username === undefined ||
      router.query.secret === undefined
    ) {
      window.location.assign("https://pickup-davi-web.vercel.app/");
    }
    setUsername(router.query.username);
    setSecret(router.query.secret);
  }, []);
  useEffect(() => {
    if (username.length === 1 || secret.length === 1) return;
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-Key": "926cdaf3-68a6-4d34-98ea-38d1c2121004" } }
      )
      .then((r) => {
        router.push("/chats");
      });
  }, [username, secret]);

  function onSubmit(e) {
    e.preventDefault();

    if (username.length === 1 || secret.length === 1) return;

    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        { headers: { "Private-Key": "926cdaf3-68a6-4d34-98ea-38d1c2121004" } }
      )

      .then((r) => {
        router.push("/chats");
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">PickUp Chat</div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
