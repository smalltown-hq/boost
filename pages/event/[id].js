import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useSWR from "swr";
import Reactions from "components/Reactions";
import Label from "components/Label";
import Field from "components/Field";
import Textarea from "components/Textarea";
import Button from "components/Button";
import Question from "components/Question";
import QuestionPlaceholder from "components/QuestionPlaceholder";
import serialize from "utils/serialize";
import Copy from "vectors/Copy";
import Close from "vectors/Close";
import ApiService from "lib/api";

// Used in getStaticProps
import DataService from "lib/data";

function fetcher(route) {
  return ApiService.get(route).then((r) => (r.ok ? r.json() : {}));
}

const QuestionAndResponseSchema = Yup.object().shape({
  content: Yup.string().required("You'll have to write something..."),
});

// Number of questions per "page"
const PAGE = 5;

export default function Event(props) {
  const { isFallback: isStaticRendering, query } = useRouter();
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const { data: event, error, mutate: mutateEvent } = useSWR(
    () => {
      if (isFallback) {
        throw new Error();
      }

      return `/api/events/${query.id}`;
    },
    fetcher,
    { event: props.event }
  );

  const isFallback = isStaticRendering && !event;

  useEffect(() => {
    if (event && event.questions && loadedQuestions.length < 1) {
      setLoadedQuestions(event.questions.slice(0, PAGE));
    }
  }, [event]);

  useEffect(() => {
    // Sockets would be a better implementation for this,
    // to keep it simple we will use HTTP requests
    ApiService.get(`/api/events/${query.id}/join`).then(
      async (response) => response.ok && mutateEvent(await response.json())
    );

    window.addEventListener("beforeunload", (event) =>
      ApiService.get(`/api/events/${query.id}/leave`)
    );

    const snack = localStorage.getItem(`copy-snack-${query.id}`);

    if (snack === null) {
      setTimeout(() => setSnackOpen(true), 3000);
    }

    return () => ApiService.get(`/api/events/${query.id}/leave`);
  }, [query.id]);

  const handleQuestionSubmit = async (values, formikContext) => {
    mutateEvent(
      (event = { questions: [] }) => ({
        ...event,
        questions: [...event.questions, "temp"],
      }),
      false
    );

    const questionRequest = await ApiService.post(
      `/api/questions/create?event=${query.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (questionRequest.ok) {
      formikContext.resetForm();
      const updatedEvent = await questionRequest.json();

      const newQuestion =
        updatedEvent.questions[updatedEvent.questions.length - 1];

      setLoadedQuestions([...loadedQuestions, newQuestion]);

      formikContext.setErrors({
        general: {
          content: (
            <span
              onClick={() => {
                document
                  .getElementById(newQuestion)
                  ?.scrollIntoView({ behavior: "smooth" });

                formikContext.setErrors({});
              }}
            >
              Question asked! Click here to focus it.
            </span>
          ),
        },
      });

      mutateEvent(updatedEvent);

      setTimeout(() => {
        formikContext.setErrors({});
      }, 2500);
    }
  };

  const handleReaction = async (reaction) => {
    mutateEvent(
      (event = {}) => ({
        ...event,
        reactions: {
          ...event?.reactions,
          [reaction]:
            (event?.reactions && event?.reactions[reaction]
              ? event?.reactions[reaction]
              : 0) + 1,
        },
      }),
      false
    );

    const reactionRequest = await ApiService.get(
      `/api/events/${query.id}/react?reaction=${reaction}`
    );

    if (reactionRequest.ok) {
      mutateEvent(reactionRequest.json());
    }
  };

  const copy = async () => {
    await navigator.clipboard?.writeText(
      `${new URL(location.href).origin}/event/${query.id}`
    );
    localStorage.setItem(`copy-snack-${query.id}`, +true);
    setSnackOpen(false);
  };

  const handleLoadMore = () => {
    const currentLength = loadedQuestions.length;

    setLoadedQuestions([
      ...loadedQuestions,
      ...event.questions.slice(currentLength, currentLength + PAGE),
    ]);
  };

  return (
    <>
      <Head>
        <title>{`Boosted ${event?.name || ""}`}</title>
        <meta
          name="og:title"
          key="og:title"
          content={`Boosted ${event?.name || ""}`}
        />
        <meta
          name="og:url"
          key="og:url"
          content={`https://getboost.app/event/${query.id}`}
        />
      </Head>
      <section className={`event ${isFallback ? "event--fallback" : ""}`}>
        <div className="event__container">
          <div className="event__title-group">
            <h1 className="event__title">Welcome to - {event?.name}</h1>
            <p className="event__view-count">
              {event?.liveViewers < 2
                ? "You are the only one here!"
                : `${event?.liveViewers - 1} people are here with you`}
            </p>
          </div>
          <div className="event__reactions">
            <p className="reactions__title">Give a reaction</p>
            <Reactions
              fallback={isFallback}
              onReaction={handleReaction}
              reactions={event?.reactions}
            />
          </div>
          <div className="event__questions">
            <Formik
              validationSchema={QuestionAndResponseSchema}
              initialValues={{ content: "" }}
              onSubmit={handleQuestionSubmit}
            >
              {({ getFieldProps, isSubmitting, isValid, errors, touched }) => (
                <Form>
                  <Field error={touched.content && errors.content}>
                    <Label
                      hint="Supports markdown"
                      style={{ fontSize: "1.25rem" }}
                    >
                      Ask a question
                    </Label>
                    {!isFallback && (
                      <Textarea
                        {...getFieldProps("content")}
                        disabled={isSubmitting}
                      />
                    )}
                    {isFallback && <div className="textarea__placeholder" />}
                  </Field>
                  <div className="button-group">
                    {!isFallback && (
                      <Button
                        loading={isSubmitting}
                        disabled={!isValid}
                        status={
                          <span
                            style={{
                              color: errors.general?.color || "var(--success)",
                            }}
                          >
                            {errors.general?.content}
                          </span>
                        }
                        reverse
                      >
                        Ask
                      </Button>
                    )}
                    {isFallback && <div className="button__placeholder" />}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="event__questions-list">
            <p className="reactions__title">
              {event?.questions?.length > 1 && event?.questions?.length}{" "}
              Questions
            </p>
            {isFallback && <QuestionPlaceholder />}
            {!isFallback &&
              event?.questions?.length < 1 &&
              "Be the first one to ask a question!"}
            {!isFallback &&
              loadedQuestions?.length >= 1 &&
              loadedQuestions.map((questionId) => {
                return (
                  <div className="question__wrapper" key={questionId}>
                    <Question questionId={questionId} />
                  </div>
                );
              })}
            {loadedQuestions.length !== event?.questions?.length && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button onClick={handleLoadMore}>Load more</Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isSnackOpen && (
          <motion.div
            exit="closed"
            animate="open"
            initial="closed"
            variants={{
              closed: {
                x: "-100%",
                opacity: 0,
              },
              open: {
                x: 0,
                opacity: 1,
              },
            }}
            className="event-copy-snack"
          >
            Click{" "}
            <strong
              onClick={copy}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                padding: "0 0.25rem",
              }}
            >
              here <Copy />
            </strong>{" "}
            to copy and share the link with your community!
            <Close
              style={{
                margin: "0 1rem",
                cursor: "pointer",
                position: "absolute",
                top: "0.5rem",
                right: "0rem",
              }}
              onClick={() => setSnackOpen(false)}
            />
            <Button
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={copy}
            >
              Copy
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        :global(.event-copy-snack) {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          width: calc(100% - 2rem);
          border-radius: var(--border-radius);
          background: var(--accent-1);
          padding: 2rem 1rem 1rem 1rem;
          box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
            0 6.7px 5.3px rgba(0, 0, 0, 0.028),
            0 12.5px 10px rgba(0, 0, 0, 0.035),
            0 22.3px 17.9px rgba(0, 0, 0, 0.042),
            0 41.8px 33.4px rgba(0, 0, 0, 0.05),
            0 100px 80px rgba(0, 0, 0, 0.07);
        }

        .question__wrapper {
          margin-bottom: 1rem;
        }

        .event__questions-list .reactions__title {
          padding-bottom: 1rem;
        }

        .button-group {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        .button__placeholder {
          background: var(--accent-2);
          width: 60px;
          height: 40px;
          border-radius: var(--border-radius);
        }

        .textarea__placeholder {
          background: var(--accent-2);
          width: 100%;
          height: 200px;
          border-radius: var(--border-radius);
        }

        .reactions__title {
          font-size: 1.25rem;
          font-weight: bold;
        }

        .event__questions {
          width: 100%;
        }

        .event__reactions,
        .event__questions,
        .event__questions-list {
          padding-bottom: 3rem;
          text-align: left;
          width: 100%;
        }

        @keyframes placeHolderShimmer {
          0% {
            background-position: -768px 0;
          }
          100% {
            background-position: 768px 0;
          }
        }

        .event--fallback .event__title,
        .event--fallback .button__placeholder,
        .event--fallback .textarea__placeholder,
        .event--fallback .event__view-count {
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

        .event__title,
        .event__view-count {
          border-radius: var(--border-radius);
        }

        .event__title {
          font-size: 2.25rem;
          margin-bottom: 0.5rem;
        }

        .event__title-group {
          padding-bottom: 6rem;
        }

        .event__container {
          width: 100%;
          max-width: 600px;
          padding: 1rem;
        }

        .event__container,
        .event__title-group,
        .event {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          user-select: none;
        }

        @media screen and (min-width: 500px) {
          :global(.event-copy-snack) {
            width: 250px;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ params }) {
  const event = serialize(
    await DataService.fetch(`/api/events/${params.id}`).then(
      (r) => r.ok && r.json()
    )
  );

  return {
    props: { event },
    unstable_revalidate: 5,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
