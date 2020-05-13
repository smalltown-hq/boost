import React from "react";
import Emoji from "components/Emoji";

export default function Footer() {
  return (
    <>
      <div className="footer">
        Made with <Emoji alt="love">❤️</Emoji> by{" "}
        <a href="https://twitter.com/zealigan">Eric Adamski</a>
      </div>
      <style jsx>{`
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--foreground);
        color: var(--background);
        font-weight: normal;
        padding: 0.75rem;

        a,
        a:visited {
          padding-left: 0.25rem;
          color: var(--background);
        }
      `}</style>
    </>
  );
}
