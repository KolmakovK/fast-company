import React from "react";

const BookMark = ({ status, onClick }) => {
  const style = status ? "bi bi-bookmark-heart-fill" : "bi bi-bookmark-heart";
  return (
    <button onClick={onClick}>
      <i className={style}></i>
    </button>
  );
};

export default BookMark;
