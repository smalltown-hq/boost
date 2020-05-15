import React from "react";

export default function Menu(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>Menu</title>
      <path
        d="M11 3C10.448 3 10 3.448 10 4V6C10 6.552 10.448 7 11 7H13C13.552 7 14 6.552 14 6V4C14 3.448 13.552 3 13 3H11ZM11 10C10.448 10 10 10.448 10 11V13C10 13.552 10.448 14 11 14H13C13.552 14 14 13.552 14 13V11C14 10.448 13.552 10 13 10H11ZM11 17C10.448 17 10 17.448 10 18V20C10 20.552 10.448 21 11 21H13C13.552 21 14 20.552 14 20V18C14 17.448 13.552 17 13 17H11Z"
        fill="var(--foreground)"
      />
    </svg>
  );
}
