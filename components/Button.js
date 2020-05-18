import React, { forwardRef } from "react";
import Loader from "vectors/Loader";

export default forwardRef(function Button({ loading, ...props }, ref) {
  return (
    <>
      <div className={`button-wrapper ${props.reverse ? "reverse" : ""}`}>
        <button
          className="button"
          {...props}
          disabled={loading || props.disabled}
          ref={ref}
        >
          {props.children}{" "}
          {loading && (
            <Loader
              height="1rem"
              width="1rem"
              style={{ marginLeft: "0.5rem" }}
            />
          )}
        </button>
        {props.status && <p className="status">{props.status}</p>}
      </div>
      <style jsx>{`
        .status {
          padding: 0 0.5rem;
        }

        .button-wrapper.reverse {
          flex-direction: row-reverse;
        }

        .button-wrapper {
          display: inline-flex;
          align-items: center;
        }

        .button {
          border: none;
          background: ${props.secondary
            ? "var(--background)"
            : "var(--primary)"};
          color: var(--foreground);
          font-weight: bold;
          font-size: 1rem;
          border-radius: var(--border-radius);
          padding: 0.75rem 1.25rem;
          min-width: ${props.secondary ? 100 : 150}px;
          will-change: width;
          transition: width 0.2s ease;
        }

        .button:hover {
          cursor: pointer;
        }

        .button[disabled] {
          opacity: 0.8;
          pointer-events: none;
        }
      `}</style>
    </>
  );
});
