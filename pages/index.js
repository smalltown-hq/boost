import Link from "next/link";
import Button from "components/Button";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Reaction from "vectors/Reaction";
import Question from "vectors/Question";
import Penguins from "vectors/Penguins";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Watch from "vectors/buttons/Watch";
import Read from "vectors/buttons/Read";
import useAuth from "hooks/useAuth";

export default function Home() {
  const user = useAuth();

  return (
    <>
      {user && (
        <section className="user">
          {user.events?.length > 0 ? (
            "TODO: add list of events"
          ) : (
            <>
              <p className="user__empty-text">You've never boosted an event!</p>
              <Link href="/event/new">
                <Button>Boost an event</Button>
              </Link>
            </>
          )}
        </section>
      )}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Boost participation for your online events.
          </h1>
          <Link href="/how">
            <Button className="hero__cta">Learn how</Button>
          </Link>
        </div>
        <HomeIcon className="hero__icon" />
        <Curve className="hero__curve" />
      </section>
      <section className="feature">
        <div className="feature__image">
          <Reaction />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Live reactions</h2>
          <p className="feature__description">
            Simply click an emoji and send those presenters some love!
          </p>
          <Link href="/login">
            <Button>Try boost</Button>
          </Link>
        </div>
      </section>
      <section className="feature">
        <div className="feature__image">
          <Question />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Ask questions & create discussion</h2>
          <p className="feature__description">
            Don't lose track of question in the chat. Question that act like
            discussion threads, there when you need them.
          </p>
          <Link href="/login">
            <Button>Boost engagement</Button>
          </Link>
        </div>
      </section>
      <section className="feature">
        <div className="feature__image">
          <Penguins />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Give your event a boost!</h2>
          <p className="feature__description">
            Add engaging features to your existing event and bring your vibrant
            community together.
          </p>
          <Link href="/login">
            <Button>Gimmy a boost!</Button>
          </Link>
        </div>
      </section>
      <section className="resources">
        <div className="resources__pair">
          <div className="resource">
            <h2 className="resource__title">Watch how this was built</h2>
            <p className="resource__description">
              Check out how we built this site using Next.js and other awesome{" "}
              <a href="https://vercel.com">Vercel</a> tech.
            </p>
            <a href="">
              <Watch />
            </a>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Built & hosted on <a href="https://vercel.com">Vercel</a>
            </h2>
            <p className="resource__description">
              Deploy this exact app with the click of a button!
            </p>
            <a href="">
              <VercelDeploy />
            </a>
          </div>
        </div>
        <div className="resources__pair">
          <div className="resource">
            <h2 className="resource__title">
              Check us out on <a href="">Product Hunt</a>
            </h2>
            <p className="resource__description">
              Like what you see? Head over to Product Hunt and leave us a review
              and a vote!
            </p>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Read about how we built our auth flow
            </h2>
            <p className="resource__description">
              Checkout the <a href="">Vercel blog</a> to read how we build the
              auth flow for Boost.
            </p>
            <a href="">
              <Read />
            </a>
          </div>
        </div>
      </section>
      <style jsx>{`
        // RESOURCES
        .resource__title {
          font-size: 2rem;
        }

        .resource__description {
          padding-bottom: 1rem;
        }

        .resource {
          max-width: 525px;
          padding: 2rem 4rem;
        }

        .resources__pair {
          display: flex;
        }

        .resources {
          width: 100vw;
          height: 100vh;
          background: var(--accent-1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        // FEATURES
        .feature__description {
          padding-bottom: 1rem;
        }

        .feature__title {
          font-size: 2rem;
        }

        .feature__content {
          margin: 0 3rem;
          max-width: 400px;
        }

        .feature__image {
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: #fff;
          margin: 0 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature:nth-child(odd) {
          flex-direction: row-reverse;
        }

        .feature {
          background: var(--accent-1);
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        // HERO
        :global(.hero__icon) {
          position: absolute;
          right: 20%;
          bottom: -2.5%;
          z-index: 1;
        }

        :global(.hero__curve) {
          position: absolute;
          bottom: 0;
          width: 100vw;
        }

        .hero__content > :global(button) {
          padding: 1rem 2rem;
          font-size: 1.25rem;
        }

        .hero__title {
          font-size: 2.75rem;
          max-width: 550px;
          padding-bottom: 2rem;
        }

        .hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 120px);
          width: 100vw;
        }

        // USER
        .user__empty-text {
          padding-bottom: 1rem;
        }

        .user {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          width: 100vw;
          background: var(--accent-1);
        }
      `}</style>
    </>
  );
}

export function getStaticProps() {
  // fetch number of depoys
  return {
    props: {},
  };
}
