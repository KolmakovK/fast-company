import React from "react";

const BookMark = ({ status, ...rest }) => {
  const style = status ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark-heart";
  return (
    <button onClick={status}>
      <i className={style}></i>
    </button>
  );
};

export default BookMark;
