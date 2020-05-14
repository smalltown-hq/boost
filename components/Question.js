import React, { useState } from "react";
import useSWR from "swr";
import prettyMs from "pretty-ms";
import Markdown from "react-markdown";
import QuestionPlaceholder from "components/QuestionPlaceholder";
import ApiService from "services/api";
import ThumbUp from "vectors/emoji/ThumbUp";

function fetcher(route) {
  return ApiService.fetch(route).then((r) => (r.ok ? r.json() : {}));
}

export default function Question(props) {
  const [areCommentsOpen, setCommentsOpen] = useState(false);
  const { data: question } = useSWR(`/questions/${props.questionId}`, fetcher);

  const loading = question === undefined;

  if (loading) {
    return <QuestionPlaceholder />;
  }

  return (
    <>
      <div className="question">
        <div className="question__time">
          Asked{" "}
          {!loading &&
            prettyMs(Date.now() - new Date(question.createdAt).getTime(), {
              unitCount: 1,
              verbose: true,
            })}{" "}
          ago
        </div>
        <div className="question__content">
          <Markdown source={question.content} />
        </div>
        <div className="question__footer">
          <div
            className="question__comments"
            onClick={() => setCommentsOpen(!areCommentsOpen)}
          >
            {!areCommentsOpen && question.comments.length}{" "}
            <span style={{ textDecoration: "underline" }}>
              {areCommentsOpen ? "Close c" : "C"}omments
            </span>
          </div>
          <div className="question__votes">
            <div className="vote__count">{question.votes.length}</div>
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
          border-radius: var(--border-radius);
        }

        .question__time {
          border-radius: var(--border-radius);
          color: var(--grey);
        }

        .question__comments {
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
          padding: 1.5rem;
        }
      `}</style>
    </>
  );
}
