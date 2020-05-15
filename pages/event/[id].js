import { useEffect } from "react";
import { useRouter } from "next/router";
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
import ApiService from "services/api";

function fetcher(route) {
  return ApiService.fetch(route).then((r) => (r.ok ? r.json() : {}));
}

const QuestionAndResponseSchema = Yup.object().shape({
  content: Yup.string().required("You'll have to write something..."),
});

export default function Event(props) {
  const { isFallback, query } = useRouter();
  const { data: event, error, mutate: mutateEvent } = useSWR(
    () => {
      if (isFallback) {
        throw new Error();
      }

      return `/events/${query.id}`;
    },
    fetcher,
    {
      initialData: isFallback ? {} : props.event,
    }
  );

  useEffect(() => {
    ApiService.fetch(`/events/${query.id}/join`).then(
      async (response) => response.ok && mutateEvent(await response.json())
    );

    window.addEventListener("beforeunload", (event) =>
      ApiService.fetch(`/events/${query.id}/leave`)
    );

    return () => ApiService.fetch(`/events/${query.id}/leave`);
  }, [query.id]);

  const handleQuestionSubmit = async (values, formikContext) => {
    const questionRequest = await ApiService.fetch(
      `/questions/create?event=${query.id}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(values),
      }
    );

    if (questionRequest.ok) {
      formikContext.resetForm();
      mutateEvent(questionRequest.json());
    }
  };

  const handleReaction = async (reaction) => {
    mutateEvent({
      ...event,
      reactions: {
        ...event.reactions,
        [reaction]:
          (event.reactions && event.reactions[reaction]
            ? event.reactions[reaction]
            : 0) + 1,
      },
    });

    const reactionRequest = await ApiService.fetch(
      `/events/${query.id}/react?reaction=${reaction}`
    );

    if (reactionRequest.ok) {
      mutateEvent(reactionRequest.json());
    }
  };

  return (
    <>
      <section className={`event ${isFallback ? "event--fallback" : ""}`}>
        <div className="event__container">
          <div className="event__title-group">
            <h1 className="event__title">Welcome to - {event.name}</h1>
            <p className="event__view-count">
              {event.liveViewers < 2
                ? "You are the only one here!"
                : `${event.liveViewers} people are here with you`}
            </p>
          </div>
          <div className="event__reactions">
            <p className="reactions__title">Give a reaction</p>
            <Reactions
              fallback={isFallback}
              onReaction={handleReaction}
              reactions={event.reactions}
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
                      <Button loading={isSubmitting} disabled={!isValid}>
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
            <p className="reactions__title">Questions</p>
            {isFallback && <QuestionPlaceholder />}
            {!isFallback &&
              event.questions?.length < 1 &&
              "Be the first one to ask a question!"}
            {!isFallback &&
              event.questions?.length >= 1 &&
              event.questions.map((questionId) => {
                return (
                  <div className="question__wrapper" key={questionId}>
                    <Question questionId={questionId} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <style jsx>{`
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
      `}</style>
    </>
  );
}

export async function getStaticProps({ params }) {
  const event = await fetcher(`/events/${params.id}`);

  return {
    props: { event },
    unstable_revalidate: 5,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
