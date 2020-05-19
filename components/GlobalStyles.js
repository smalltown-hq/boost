import React from "react";

export default function Styles() {
  return (
    <style global jsx>{`
      :root {
        --background: #ffffff;
        --accent-1: #f3f6e6;
        --accent-2: #e2e2e2;
        --foreground: #383a48;
        --grey: #898989;
        --primary: #7fd6c2;
        --yellow: #f6e049;
        --error: #e0719e;
        --success: #3ab795;
        --font: "Poppins";
        --border-radius: 4px;
      }

      *,
      * > * {
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        color: var(--foreground);
        box-sizing: border-box;
        font-family: var(--font), "Helvetica", "Arial", sans-serif;
        background: var(--background);
        overflow-x: hidden;
      }

      a {
        font-weight: bold;
        display: inline-flex;
      }

      a:visited {
        color: var(--foreground);
      }
    `}</style>
  );
}
