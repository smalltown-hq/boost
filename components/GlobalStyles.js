import React from "react";

export default function Styles() {
  return (
    <style global jsx>{`
      :root {
        --background: #ffffff;
        --accent-1: #f3f6e6;
        --foreground: #383a48;
        --grey: #898989;
        --primary: #7fd6c2;
        --yellow: #f6e049;
        --error: #e0719e;
        --font: "Poppins", sans-serif;
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
        font-family: var(--font);
        background: var(--background);
      }

      a {
        font-weight: bold;
        display: inline-flex;
      }

      a:visited {
        color: var(--foreground);
      }

      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: local("Poppins Light"), local("Poppins-Light"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local("Poppins Medium"), local("Poppins-Medium"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local("Poppins Bold"), local("Poppins-Bold"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2)
            format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}</style>
  );
}
