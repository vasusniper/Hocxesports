import React, { useEffect } from "react";
import "./youtubeEmbed.css";

const YouTubeEmbed = () => {
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("player", {
        events: {
          onReady: (event) => {
            event.target.mute(); // Ye video ko mute karega
          },
        },
      });
    };
  }, []);

  return (
    <>
      <h2 className="text-center" style={{color:"#ffc107"}}> letest streaming</h2>
      <div className="divider"></div>
      <div className="container youtube-embed">
        <div className="row ">
          <div className="col-12 col-sm-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/R_K9B_fCsfE?si=rmMpHZxTPQ4qbRmP"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-12 col-sm-6">
            <iframe
              id="player"
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/DlvBk6YhAxw?si=R_4DSbipQQnplaZ2"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default YouTubeEmbed;
