import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form } from "formik";
import Router from "next/router";
import * as Yup from "yup";
import useSWR from "swr";
import prettyMs from "pretty-ms";
import Markdown from "react-markdown";
import useAuth from "hooks/useAuth";
import Label from "components/Label";
import Field from "components/Field";
import Textarea from "components/Textarea";
import Button from "components/Button";
import QuestionPlaceholder from "components/QuestionPlaceholder";
import DataService from "lib/data";
import id from "utils/id";
import ThumbUp from "vectors/emoji/ThumbUp";
import ApiService from "lib/api";

function fetcher(route) {
  return ApiService.get(route).then((r) => (r.ok ? r.json() : {}));
}

const QuestionAndResponseSchema = Yup.object().shape({
  content: Yup.string().required("You'll have to write something..."),
});

const commentVariants = {
  open: { height: "auto" },
  closed: { height: 0 },
};

export default function Question(props) {
  const { user } = useAuth();
  const [areCommentsOpen, setCommentsOpen] = useState(false);
  const { data: question, mutate: mutateQuestion } = useSWR(
    `/api/questions/${props.questionId}`,
    fetcher
  );

  const loading = question === undefined;

  const handleVote = async () => {
    let uniqueId = user?._id || localStorage.getItem("_buid");

    if (!uniqueId) {
      // Either not logged in, or no uid exists so create and write it
      uniqueId = id();
      localStorage.setItem("_buid", uniqueId);
    }

    const votes = new Set(question.votes);

    votes[votes.has(uniqueId) ? "delete" : "add"](uniqueId);

    mutateQuestion(
      (question = {}) => ({
        ...question,
        votes: Array.from(votes),
      }),
      false
    );

    const voteRequest = await ApiService.get(
      `/api/questions/${props.questionId}/vote?voter=${uniqueId}`
    );

    if (voteRequest.ok) {
      mutateQuestion(voteRequest.json());
    }
  };

  const handleSubmit = async (values, formikContext) => {
    mutateQuestion(
      (question = {}) => ({
        ...question,
        comments: [
          ...question.comments,
          {
            _id: id(),
            createdAt: Date.now(),
            content: values.content,
          },
        ],
      }),
      false
    );

    const commentRequest = await ApiService.post(
      `/api/questions/${props.questionId}/comment`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (commentRequest.ok) {
      formikContext.resetForm();
      mutateQuestion(commentRequest.json());
      formikContext.setErrors({
        general: { content: "Comment posted!" },
      });

      setTimeout(() => {
        formikContext.setErrors({});
      }, 1500);
    } else {
      formikContext.setErrors({
        general: {
          content:
            (await commentRequest.text()) || "An unexpected error ocurred.",
          color: "var(--error)",
        },
      });
    }
  };

  if (loading) {
    return <QuestionPlaceholder id={props.questionId} />;
  }

  return (
    <>
      <div className="question" id={props.questionId}>
        <div className="question__time">
          Asked{" "}
          {!loading &&
            prettyMs(
              Date.now() - new Date(question.createdAt || Date.now()).getTime(),
              {
                unitCount: 1,
                verbose: true,
              }
            )}{" "}
          ago
        </div>
        <div className="question__content">
          <Markdown source={question.content} />
        </div>
        <div className="question__footer">
          <div className="footer__container">
            <div
              className="question__comments"
              onClick={() => setCommentsOpen(!areCommentsOpen)}
            >
              {!areCommentsOpen && question.comments.length}{" "}
              <span style={{ textDecoration: "underline" }}>
                {areCommentsOpen ? "Close c" : "C"}omments
              </span>
            </div>
            <div className="question__votes" onClick={handleVote}>
              <div className="vote__count">{question.votes.length}</div>
              <div className="voter">
                <motion.span
                  initial={
                    {
                      // y: 0,
                    }
                  }
                  whileHover={{
                    rotate: -45,
                    transition: {
                      yoyo: Infinity,
                      duration: 0.25,
                    },
                  }}
                >
                  <ThumbUp />
                </motion.span>
              </div>
            </div>
          </div>
          <div className="question__comments-container">
            <AnimatePresence>
              {areCommentsOpen && (
                <motion.div
                  initial="closed"
                  exit="closed"
                  animate="open"
                  className="comments"
                  variants={commentVariants}
                >
                  {question.comments.map((comment) => {
                    return (
                      <div key={comment._id} className="comment">
                        <div className="comment__time">
                          Commented{" "}
                          {prettyMs(
                            Date.now() - new Date(comment.createdAt).getTime(),
                            { unitCount: 1, verbose: true }
                          )}{" "}
                          ago
                        </div>
                        <div className="comment__content">
                          <Markdown source={comment.content} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="comment__input">
                    <Formik
                      validationSchema={QuestionAndResponseSchema}
                      initialValues={{ content: "" }}
                      onSubmit={handleSubmit}
                    >
                      {({
                        getFieldProps,
                        isValid,
                        isSubmitting,
                        touched,
                        errors,
                      }) => (
                        <Form>
                          <Field error={touched.content && errors.content}>
                            <Textarea
                              disabled={isSubmitting}
                              {...getFieldProps("content")}
                              style={{ minHeight: 125 }}
                              placeholder="Write a comment..."
                            />
                          </Field>
                          <div className="button-group">
                            <Button
                              type="submit"
                              disabled={!isValid}
                              loading={isSubmitting}
                              status={
                                <span
                                  style={{
                                    color:
                                      errors.general?.color || "var(--success)",
                                  }}
                                >
                                  {errors.general?.content}
                                </span>
                              }
                              reverse
                            >
                              Comment
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <style jsx>{`
        .comment__input {
          padding-top: 0.5rem;
        }

        .comment__content {
          padding: 0.5rem 0;
        }

        .comment__content:last-child {
          padding-bottom: 0;
        }

        .comment {
          padding: 0.5rem;
        }

        :global(.comments) {
          overflow: hidden;
        }

        .question__footer {
        }

        .footer__container {
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

        .question__time,
        .comment__time {
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

        .button-group {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}
