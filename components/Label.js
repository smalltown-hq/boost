import React from "react";

export default function Label(props) {
  return (
    <>
      <div>
        <label {...props} />
        {props.hint && <p className="hint">{props.hint}</p>}
      </div>
      <style jsx>{`
        font-size: 1rem;
        font-weight: bold;

        .hint {
          font-weight: 300;
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
}
