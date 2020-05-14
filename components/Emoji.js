import React from "react";

export default function Emoji(props) {
  return (
    <>
      <span aria-label={props.alt} role="img">
        {props.children}
      </span>
      <style jsx>{`
        padding: 0 0.25rem;
      `}</style>
    </>
  );
}
