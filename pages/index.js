import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { username, secret } = router.query;
  console.log(username, secret);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (typeof document !== undefined) {
        setShowChat(true);
        setLoading(false);
      }
    }, 2000);
  }, []);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <ChatEngine
            height="calc(100vh - 212px)"
            projectID="98554d93-5bcc-4c28-8594-ba95b6672043"
            userName={username}
            userSecret={secret}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
