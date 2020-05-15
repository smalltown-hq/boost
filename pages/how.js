import Link from "next/link";
import Button from "components/Button";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Dive from "vectors/Dive";
import Share from "vectors/Share";
import Community from "vectors/Community";

export default function How() {
  return (
    <>
      <section className="main">
        <div className="main__content">
          <h1 className="main__title">How does Boost work?</h1>
          <div className="steps">
            <div className="step">
              <div className="step__image">
                <Dive />
              </div>
              <div className="step__content">
                <div className="step__number">1</div>
                <h2>Enter the title of your event</h2>
                <Link href="/event/new">
                  <Button>Create event</Button>
                </Link>
              </div>
            </div>
            <div className="step">
              <div className="step__image">
                <Share />
              </div>
              <div className="step__content">
                <div className="step__number">2</div>
                <h2>Copy and share the link</h2>
                <Link href="/event/new">
                  <Button>Create event</Button>
                </Link>
              </div>
            </div>
            <div className="step">
              <div className="step__image">
                <Community />
              </div>
              <div className="step__content">
                <div className="step__number">3</div>
                <h2>Engage with your community - online!</h2>
                <Link href="/event/new">
                  <Button>Create event</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HomeIcon className="main__icon" />
        <Curve className="main__curve" />
      </section>
      <style jsx>{`
        .step {
          padding-bottom: 10rem;
        }

        .step__content > h2 {
          padding: 1rem 0;
        }

        .step__content {
          padding-top: 2rem;
          max-width: 300px;
        }

        .step__number {
          width: 100px;
          height: 100px;
          color: var(--background);
          background: var(--foreground);
          border-radius: 50%;
          font-size: 3rem;
        }

        .steps,
        .step,
        .step__number,
        .step__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        :global(.main__icon) {
          position: absolute;
          right: 20%;
          bottom: -1%;
          z-index: 1;
        }

        :global(.main__curve) {
          position: absolute;
          bottom: 0;
          width: 100vw;
        }

        .main__content > :global(button) {
          padding: 1rem 2rem;
          font-size: 1.25rem;
        }

        .main__details {
          padding-bottom: 1rem;
        }

        .main__title {
          padding-bottom: 2rem;
          font-size: 2.75rem;
        }

        .main__content {
          text-align: center;
          max-width: 500px;
          padding-bottom: 4rem;
        }

        .main {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: calc(100vh - 120px);
          width: 100vw;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
