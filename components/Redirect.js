import React from "react";
import Head from "next/head";

export default function Redirect(props) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (document.cookie && document.cookie.indexOf("authed") ${
              props.redirectOnUser ? "> -1" : "< 0"
            }) {
                if (document.location.pathname !== "/home") {
                    window.location.href = "${props.redirectTo}";
                }
            }
        `,
          }}
        />
      </Head>
      <style global jsx>{`
        body {
          display: ${typeof window !== "undefined" &&
          props.redirectOnUser &&
          document.cookie.includes("authed") &&
          location.pathname !== "/home"
            ? "none"
            : "block"};
        }
      `}</style>
    </>
  );
}
