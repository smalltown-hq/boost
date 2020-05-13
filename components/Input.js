import React from "react";

export default function Input(props) {
  return (
    <>
      <input {...props} />
      <style jsx>{`
        :hover,
        :focus,
        :active {
          outline: none;
          border-color: var(--primary);
        }

        border: 2px solid var(--grey);
        height: 40px;
        border-radius: var(--border-radius);
        font-size: 1rem;
        padding: 0.25rem;
      `}</style>
    </>
  );
}
