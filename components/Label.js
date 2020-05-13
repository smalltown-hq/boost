import React from "react";

export default function Label(props) {
  return (
    <>
      <label {...props} />
      <style jsx>{`
        font-size: 1rem;
        font-weight: bold;
      `}</style>
    </>
  );
}
