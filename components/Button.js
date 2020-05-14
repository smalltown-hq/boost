import React, { forwardRef } from "react";
import Loader from "vectors/Loader";

export default forwardRef(function Button({ loading, ...props }, ref) {
  return (
    <>
      <button {...props} disabled={loading || props.disabled} ref={ref}>
        {props.children}{" "}
        {loading && (
          <Loader height="1rem" width="1rem" style={{ marginLeft: "0.5rem" }} />
        )}
      </button>
      <style jsx>{`
        border: none;
        background: var(--primary);
        color: var(--foreground);
        font-weight: bold;
        font-size: 1rem;
        border-radius: var(--border-radius);
        padding: 0.75rem 1.25rem;
        min-width: 150px;
        will-change: width;
        transition: width 0.2s ease;

        :hover {
          cursor: pointer;
        }

        [disabled] {
          opacity: 0.8;
          pointer-events: none;
        }
      `}</style>
    </>
  );
});
