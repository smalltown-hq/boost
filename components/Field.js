import React from "react";

export default function Field(props) {
  return (
    <>
      <div>
        {props.children}
        {props.error && <p className="error">{props.error}</p>}
      </div>
      <style jsx>{`
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 1.5rem;

        .error {
          color: var(--error);
          padding: 0;
        }
      `}</style>
    </>
  );
}
