import React, { useState } from "react";
import { motion } from "framer-motion";
import HeartEyes from "vectors/emoji/HeartEyes";
import Laughing from "vectors/emoji/Laughing";
import HeadExploding from "vectors/emoji/HeadExploding";
import Sobbing from "vectors/emoji/Sobbing";
import Heart from "vectors/emoji/Heart";
import Colon100Colon from "vectors/emoji/100";
import Clap from "vectors/emoji/Clap";
import Rocket from "vectors/emoji/Rocket";

const REACTIONS = [
  ["heart-eyes", HeartEyes],
  ["laughing", Laughing],
  ["exploding-head", HeadExploding],
  ["sobbing", Sobbing],
  ["love", Heart],
  [":100:", Colon100Colon],
  ["clap", Clap],
  ["rocket", Rocket],
];

const variants = {
  bounce: {
    y: [-2, 0, 2],
    transition: {
      yoyo: Infinity,
      duration: 0.25,
      times: [0.2, 0.8, 1],
    },
  },
};

export default function Reactions(props) {
  const [tapped, setTapped] = useState();

  const afterTap = (matcher) => {
    if (matcher === tapped) {
      return {
        y: [0, -100, 0, 0],
        scale: [1, 0, 1, 1],
        opacity: [1, 0, 0, 1],
        transition: {
          duration: 0.6,
          times: [0, 0.4, 0.9, 1],
        },
      };
    }

    return { y: null, scale: null, opacity: null };
  };

  return (
    <>
      <div
        className={`reactions ${props.fallback ? "reactions--fallback" : ""}`}
      >
        {REACTIONS.map(([key, Emoji]) => {
          return (
            <div className="reaction" key={key}>
              <div
                className="reaction__emoji"
                onClick={() =>
                  props.onReaction instanceof Function && props.onReaction(key)
                }
              >
                <motion.div
                  initial={{ y: 0 }}
                  className="emoji__container"
                  onTap={() => setTapped(key)}
                  animate={afterTap(key)}
                  onAnimationComplete={() => setTapped()}
                >
                  <Emoji />
                </motion.div>
              </div>
              <p className="reaction__count">
                {(props.reactions && props.reactions[key]) || 0}
              </p>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .reaction__count {
          margin-top: 0.5rem;
          border-radius: var(--border-radius);
        }

        .reaction__emoji {
          background: var(--accent-1);
          border-radius: 50%;
          height: 56px;
          width: 56px;
          cursor: pointer;
        }

        .reaction {
          padding: 0 0.5rem;
        }

        .reaction,
        .reactions,
        :global(.emoji__container),
        .reaction__emoji {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        @keyframes placeHolderShimmer {
          0% {
            background-position: -768px 0;
          }
          100% {
            background-position: 768px 0;
          }
        }

        .reactions--fallback .reaction__count {
          color: transparent;
          animation-duration: 1.25s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: placeHolderShimmer;
          animation-timing-function: linear;
          background: var(--accent-2);
          background: linear-gradient(
            to right,
            #eeeeee 8%,
            #dddddd 18%,
            #eeeeee 33%
          );
          background-size: 800px 104px;
          position: relative;
          height: 1rem;
        }

        .reactions {
          flex-direction: row;
          flex-wrap: wrap;
          padding: 1rem 0;
          justify-content: space-evenly;
        }

        @media screen and (min-width: 600px) {
          .reactions {
            flex-wrap: nowrap;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
