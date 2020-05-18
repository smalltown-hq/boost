import React from "react";
import ThumbUp from "vectors/emoji/ThumbUp";

export default function QuestionPlaceholder(props) {
  return (
    <>
      <div className="question" id={props.id}>
        <div className="question__time" />
        <div className="question__content">
          <div className="placeholder" />
          <div className="placeholder" />
          <div className="placeholder" />
          <div className="placeholder" />
        </div>
        <div className="question__footer">
          <div className="question__comments" />
          <div className="question__votes">
            <div className="vote__count" />
            <div className="voter">
              <ThumbUp />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .question__footer {
          display: flex;
          align-items: flex-end;
          height: 50px;
        }

        .voter {
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          background: var(--foreground);
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .question__votes {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: flex-end;
        }

        .vote__count {
          height: 1.5rem;
          width: 25px;
          border-radius: var(--border-radius);
        }

        .question__time {
          height: 1.5rem;
          width: 150px;
          border-radius: var(--border-radius);
        }

        .question__comments {
          height: 1.5rem;
          width: 150px;
          border-radius: var(--border-radius);
        }

        .question__content {
          padding: 1rem 0;
        }

        .placeholder {
          height: 1.75rem;
          margin-bottom: 0.5rem;
          border-radius: var(--border-radius);
        }

        .placeholder:last-child {
          margin-bottom: 0;
        }

        @keyframes placeHolderShimmer {
          0% {
            background-position: -768px 0;
          }
          100% {
            background-position: 768px 0;
          }
        }

        .vote__count,
        .question__comments,
        .question__time,
        .placeholder {
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
        }

        .question {
          background: var(--accent-1);
          border-radius: var(--border-radius);
          width: 100%;
          height: 300px;
          padding: 1.5rem;
        }
      `}</style>
    </>
  );
}
