import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "vectors/Logo";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Button from "components/Button";
import useAuth from "hooks/useAuth";

export default function Header(props) {
  const user = useAuth();
  const router = useRouter();

  const showAuthActions = !router.route.includes("login") && !user;

  return (
    <>
      <div className="header">
        <Link href="/">
          <div className="header__logo-container">
            <Logo />
            <span className="logo-container__title">Boost</span>
          </div>
        </Link>
        <div className="header__action-container">
          <div className="action-container__actions">
            {user && (
              <div style={{ paddingRight: "1rem" }}>
                <strong style={{ paddingRight: "0.5rem" }}>
                  Welcome back!
                </strong>{" "}
                <Link href="/event/new">
                  <Button>Create event</Button>
                </Link>
              </div>
            )}
            <a href="" style={{ marginRight: "1rem" }}>
              <VercelDeploy />
            </a>
            {showAuthActions && (
              <>
                <Link href="/login">
                  <Button>Try boost now</Button>
                </Link>
                <span className="action__login-container">
                  or <a href="/login">Log in</a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .action__login-container {
          padding-left: 0.25rem;
        }

        .action-container__actions {
          display: flex;
          align-items: center;
        }

        .header__action-container {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
        }

        .logo-container__title {
          font-weight: bold;
          font-size: 2rem;
          padding-left: 0.5rem;
        }

        .header__logo-container {
          display: flex;
          align-items: center;
        }

        .header {
          width: 100vw;
          padding: 2rem;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
