import React from "react";

export default function Close(props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>Close</title>
      <path
        d="M10 0C4.489 0 0 4.489 0 10C0 15.511 4.489 20 10 20C15.511 20 20 15.511 20 10C20 4.489 15.511 0 10 0ZM10 2C14.4301 2 18 5.56988 18 10C18 14.4301 14.4301 18 10 18C5.56988 18 2 14.4301 2 10C2 5.56988 5.56988 2 10 2ZM6.70703 5.29297L5.29297 6.70703L8.58594 10L5.29297 13.293L6.70703 14.707L10 11.4141L13.293 14.707L14.707 13.293L11.4141 10L14.707 6.70703L13.293 5.29297L10 8.58594L6.70703 5.29297Z"
        fill="var(--foreground)"
      />
    </svg>
  );
}
