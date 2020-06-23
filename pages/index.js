import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import Button from "components/Button";
import Redirect from "components/Redirect";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Reaction from "vectors/Reaction";
import Question from "vectors/Question";
import Penguins from "vectors/Penguins";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Watch from "vectors/buttons/Watch";
import Read from "vectors/buttons/Read";
import useAuth from "hooks/useAuth";
import DeployService from "lib/deploy";
import DataService from "lib/data";

export default function Home(props) {
  return (
    <>
      <Redirect redirectOnUser redirectTo="/dashboard" />
      <Head>
        <meta charSet="utf-8" />
        <title>Boost | online event engagement</title>
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta key="theme-color" name="theme-color" content="var(--primary)" />
        <meta name="twitter:site" key="twitter:site" content="@zealigan" />
        <meta
          name="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="og:title"
          key="og:title"
          content="Boost | online event engagement"
        />
        <link key="favicon" rel="shortcut icon" href="/favicon.png" />
        <meta name="og:url" key="og:url" content="https://getboost.app" />
        <meta
          name="description"
          key="description"
          content="Add simple Q&A threads and reactions to any event."
        />
        <meta
          name="og:description"
          key="og:description"
          content="Add simple Q&A threads and reactions to any event."
        />
        <meta
          name="og:image"
          key="og:image"
          content="https://getboost.app/social.png"
        />
      </Head>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Boost participation for your online events.
          </h1>
          <Link href="/how">
            <Button>Learn how</Button>
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
            <a href="https://youtu.be/u--BudNBKFU">
              <Watch />
            </a>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Built & hosted on <a href="https://vercel.com">Vercel</a>
            </h2>
            <p className="resource__description">
              Deploy this app with the click of a button!
            </p>
            <a
              href="https://vercel.com/import/project?template=https://github.com/flawk-community/boost"
              onClick={DeployService.log}
            >
              <VercelDeploy />
            </a>
          </div>
        </div>
        <div className="resources__pair">
          <div className="resource">
            <h2 className="resource__title">
              Check us out on <a href="https://www.producthunt.com/posts/boost-95741e6f-80fc-4aa2-aa7a-f936e50b80bc?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-boost-95741e6f-80fc-4aa2-aa7a-f936e50b80bc">Product Hunt</a>
            </h2>
            <p className="resource__description">
              Like what you see? Head over to Product Hunt and leave us a review
              and a vote!
            </p>
            <a
              href="https://www.producthunt.com/posts/boost-95741e6f-80fc-4aa2-aa7a-f936e50b80bc?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-boost-95741e6f-80fc-4aa2-aa7a-f936e50b80bc"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=208604&theme=light"
                alt="Boost - Increase engagement in online events | Product Hunt Embed"
                style={{ width: 250, height: 54 }}
                width="250px"
                height="54px"
              />
            </a>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Read about how we built our auth flow
            </h2>
            <p className="resource__description">
              Checkout the <a href="https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs">Vercel blog</a> to read how we build the
              auth flow for Boost.
            </p>
            <a href="https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs">
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
          flex-wrap: wrap;
          justify-content: center;
        }

        .resources {
          width: 100vw;
          min-height: 100vh;
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
          margin: 0 1rem;
          max-width: 400px;
        }

        .feature__image {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          margin: 0 1rem;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature {
          background: var(--accent-1);
          width: 100vw;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        // HERO
        :global(.hero__icon) {
          position: absolute;
          right: -5%;
          bottom: -20%;
          z-index: 1;
          transform: rotate(-45deg);
        }

        :global(.hero__curve) {
          position: absolute;
          bottom: 0;
          width: 100vw;
        }

        .hero__content {
          padding-bottom: 4rem;
        }

        .hero__content :global(.button) {
          padding: 1rem 2rem;
          font-size: 1.25rem;
        }

        .hero__title {
          font-size: 2rem;
          max-width: 550px;
          padding-bottom: 2rem;
        }

        .hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          width: 100vw;
          padding: 0 1rem;
        }

        @media (min-resolution: 3dppx) {
          .hero__title {
            font-size: 2.75rem;
          }

          :global(.hero__icon) {
            bottom: -2.5%;
          }
        }

        @media screen and (min-width: 750px) {
          .resources__pair {
            flex-wrap: nowrap;
            justify-content: flex-start;
          }

          .feature__image {
            width: 30vw;
            height: 30vw;
            margin: 0 3rem;
          }

          .feature {
            flex-wrap: nowrap;
            min-height: 60vh;
          }

          .feature:nth-child(odd) {
            flex-direction: row-reverse;
          }

          .hero__title {
            font-size: 2.75rem;
          }

          :global(.hero__icon) {
            transform: rotate(0deg);
            bottom: -2.5%;
            right: 20%;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      deployCount: (await DeployService.getCount()) || 0,
    },
    unstable_revalidate: 60,
  };
}
