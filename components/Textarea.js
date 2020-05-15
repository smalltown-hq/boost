import React from "react";

export default function Input(props) {
  return (
    <>
      <textarea {...props} />
      <style jsx>{`
        :hover,
        :focus,
        :active {
          outline: none;
          border-color: var(--primary);
        }

        resize: none;
        border: 2px solid var(--grey);
        height: 40px;
        border-radius: var(--border-radius);
        font-size: 1rem;
        padding: 0.25rem;
        min-height: 200px;
        font-family: var(--font);
      `}</style>
    </>
  );
}
