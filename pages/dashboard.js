import useSWR, { useSWRPages } from "swr";
import Router from "next/router";
import Link from "next/link";
import useAuth from "hooks/useAuth";
import Button from "components/Button";
import Redirect from "components/Redirect";
import Right from "vectors/Right";
import ApiService from "lib/api";

async function fetcher(route) {
  const eventsRequest = await ApiService.get(route);

  if (eventsRequest.ok) {
    return eventsRequest.json();
  }

  return { empty: true };
}

export default function Dashboard() {
  const { user } = useAuth();
  const {
    pages,
    isLoadingMore,
    loadMore,
    isReachingEnd,
    isEmpty,
  } = useSWRPages(
    "/api/events/list",
    ({ offset, withSWR }) => {
      const url = offset || "/api/events/list";

      const { data } = withSWR(useSWR(url, fetcher));

      if (!data)
        return [
          <li key={1} className="event event--placeholder" />,
          <li key={2} className="event event--placeholder" />,
          <li key={3} className="event event--placeholder" />,
        ];

      if (data.empty) {
        return null;
      }

      return data.results.map((event) => {
        return (
          <Link href={`/event/${event._id}`} key={event._id}>
            <li
              className="event"
              tabIndex={0}
              onKeyPress={() => Router.push(`/event/${event._id}`)}
            >
              <span style={{ flexGrow: 1 }}>{event.name}</span>
              <Right />
            </li>
          </Link>
        );
      });
    },
    (SWR) => {
      if (SWR.data?.hasMore) {
        return SWR.data.next;
      }

      return null;
    },
    []
  );

  return (
    <>
      <Redirect redirectTo="/login" />
      <section className="events-list">
        <h1 className="events-list__title">Your events</h1>
        {!isEmpty ? (
          <ul className="events">{pages}</ul>
        ) : (
          <p className="events" style={{ textAlign: "center" }}>
            You've never boosted an event!
          </p>
        )}
        {!(isReachingEnd || isEmpty) && (
          <div className="load-more">
            <Button loading={isLoadingMore} onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
        <div className="create-event">
          <p>Boost an event</p>
          <Link href="/event/new">
            <Button>Boost it!</Button>
          </Link>
        </div>
      </section>
      <style jsx>{`
        .create-event {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--accent-1);
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 500px;
        }

        .create-event > p {
          font-size: 1.25rem;
          font-weight: bold;
          padding-bottom: 1rem;
        }

        @keyframes placeHolderShimmer {
          0% {
            background-position: -768px 0;
          }
          100% {
            background-position: 768px 0;
          }
        }

        :global(.event.event--placeholder) {
          height: 3rem;
        }

        .events :global(.event.event--placeholder):nth-child(2) {
          opacity: 0.6;
        }

        .events :global(.event.event--placeholder):nth-child(3) {
          opacity: 0.4;
        }

        .events :global(.event.event--placeholder) {
          opacity: 0.8;
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

        .load-more {
          padding: 1rem;
        }

        .events {
          list-style: none;
          padding: 0;
          padding-bottom: 1.5rem;
          margin: 0;
          max-width: 500px;
          width: 100%;
        }

        .events > :global(.event):last-child {
          margin: 0;
        }

        .events > :global(.event) {
          cursor: pointer;
          background: var(--background);
          border-radius: var(--border-radius);
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          width: 100%;
          box-shadow: 0 0px 1.7px rgba(0, 0, 0, 0.02),
            0 0px 4px rgba(0, 0, 0, 0.028), 0 0px 7.5px rgba(0, 0, 0, 0.035),
            0 0px 13.4px rgba(0, 0, 0, 0.042), 0 0px 25.1px rgba(0, 0, 0, 0.05),
            0 0px 60px rgba(0, 0, 0, 0.07);
        }

        .events-list__title {
          font-size: 2rem;
          padding: 1rem 0;
        }

        .events-list {
          min-height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem;
        }
      `}</style>
    </>
  );
}
