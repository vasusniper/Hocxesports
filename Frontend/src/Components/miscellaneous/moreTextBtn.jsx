import React, { useState } from "react";

function MoreTextBtn({ Position, About }) {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <p className="d-inline me-2 mb-0">{Position}</p>
        {showMore ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
      </div>
      <div
        style={{
          padding: "8px",
          textAlign: "left",
          overflowWrap: "break-word",
        }}
      >
        {showMore && <p>{About}</p>}
      </div>
    </div>
  );
}

export default MoreTextBtn;
