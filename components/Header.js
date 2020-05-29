import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Logo from "vectors/Logo";
import Smile from "vectors/Smile";
import Heart from "vectors/Heart";
import Star from "vectors/Star";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Menu from "vectors/Menu";
import Close from "vectors/Close";
import Button from "components/Button";
import useAuth from "hooks/useAuth";
import DeployService from "lib/deploy";

const menuVariants = {
  open: { y: 0 },
  closed: {
    y: "-110vh",
  },
};

export default function Header(props) {
  const { user, loading: loadingUser } = useAuth();
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [snackClosed, setSnackClosed] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showAuthActions = !router.route.includes("login") && !user;

  const navigateToLogin = () => {
    if (!["/", "/login"].includes(router.asPath)) {
      localStorage.setItem("_bRedirectTo", router.asPath);
    }

    router.push("/login");
  };

  useEffect(() => {
    if (process.browser && !showButtons && !loadingUser) {
      setShowButtons(true);
    }
  }, [showButtons, user]);

  useEffect(() => {
    if (snackClosed) {
      const dismissed = localStorage.getItem("boost-deploy-dismissed");

      if (dismissed === null && router.asPath.indexOf("event") < 0) {
        setTimeout(() => setSnackClosed(false), 2000);
      }
    }
  }, [router]);

  return (
    <>
      <div className="header">
        <a href="/" style={{ textDecoration: "none" }}>
          <div className="header__logo-container">
            <Logo />
            <span className="logo-container__title">Boost</span>
          </div>
        </a>
        <div className="header__action-container">
          {showButtons && (
            <div className="action-container__actions">
              <div
                className="action-container__always"
                style={{ paddingRight: "0.5rem" }}
              >
                {user ? (
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button>Log in</Button>
                  </Link>
                )}
              </div>
              {user && (
                <div className="desktop-menu">
                  <Link href="/event/new">
                    <Button>Create event</Button>
                  </Link>
                  <Button
                    loading={isLoggingOut}
                    onClick={() => {
                      setIsLoggingOut(true);
                      user?.logout().then(() => setIsLoggingOut(false));
                    }}
                    secondary
                  >
                    Logout
                  </Button>
                </div>
              )}
              {showAuthActions && (
                <>
                  <div className="desktop-menu">
                    <Button onClick={navigateToLogin}>Try boost now</Button>
                  </div>
                </>
              )}
              <div className="mobile-menu">
                <Menu onClick={() => setMenuOpen(true)} />
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial="closed"
                      exit="closed"
                      animate="open"
                      className="mobile-menu__content"
                      variants={menuVariants}
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="menu__group header__logo-container">
                        <Logo />
                        <span className="logo-container__title">Boost</span>
                      </div>

                      {user && (
                        <>
                          <div className="menu__group">
                            <strong style={{ paddingRight: "0.5rem" }}>
                              Welcome back!
                            </strong>{" "}
                            <Link href="/event/new">
                              <Button>Create event</Button>
                            </Link>
                          </div>
                          <div className="menu__group">
                            <Link href="/dashboard">
                              <Button>Dashboard</Button>
                            </Link>
                          </div>
                          <div className="menu__group">
                            <Button
                              loading={isLoggingOut}
                              onClick={() => {
                                setIsLoggingOut(true);
                                user
                                  ?.logout()
                                  .then(() => setIsLoggingOut(false));
                              }}
                            >
                              Logout
                            </Button>
                          </div>
                        </>
                      )}
                      {showAuthActions && (
                        <div className="menu__group">
                          <Button onClick={navigateToLogin}>
                            Try boost now
                          </Button>
                          <span className="action__login-container">
                            or{" "}
                            <a onClick={navigateToLogin} href="/login">
                              Log in
                            </a>
                          </span>
                        </div>
                      )}
                      <div className="menu__group">
                        <a
                          href="https://vercel.com/import/project?template=https://github.com/flawk-community/boost"
                          onClick={DeployService.log}
                        >
                          <VercelDeploy height="48" />
                        </a>
                        Clone this app in one click
                      </div>
                      <Button onClick={() => setMenuOpen(false)}>Close</Button>
                      <Smile
                        style={{
                          position: "absolute",
                          bottom: "-5%",
                          right: "-5%",
                          transform: "rotate(-45deg)",
                        }}
                      />
                      <Star
                        style={{
                          position: "absolute",
                          top: "5%",
                          left: "5%",
                        }}
                      />
                      <Heart
                        style={{
                          position: "absolute",
                          bottom: "-5%",
                          left: "-10%",
                          transform: "rotate(45deg)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
        <AnimatePresence>
          {!snackClosed && (
            <motion.div
              exit="closed"
              initial="closed"
              animate="open"
              className="deploy-snack"
              variants={{
                closed: {
                  opacity: 0,
                  y: "100%",
                },
                open: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <div className="snack__content">
                <a
                  href="https://vercel.com/import/project?template=https://github.com/flawk-community/boost"
                  onClick={DeployService.log}
                  style={{ marginLeft: "1rem" }}
                >
                  <VercelDeploy className="deploy-button" />
                </a>
                <span>
                  Deploy this site in one click with{" "}
                  <a
                    href="https://vercel.com"
                    style={{ marginLeft: "0.25rem" }}
                  >
                    Vercel
                  </a>
                  !
                </span>
              </div>
              <div
                className="snack__dismiss"
                onClick={() => (
                  setSnackClosed(true),
                  localStorage.setItem("boost-deploy-dismissed", +true)
                )}
              >
                <Close className="close-button" tabIndex={0} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        .snack__dismiss > :global(.close-button > path) {
          fill: var(--background);
        }

        :global(.deploy-snack),
        .snack__dismiss,
        .snack__content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .snack__dismiss {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
          cursor: pointer;
        }

        :global(.deploy-snack) a {
          color: var(--background);
        }

        :global(.deploy-snack) {
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 100;
          width: 100vw;
          padding: 0.5rem;
          justify-content: center;
          background: var(--foreground);
          color: var(--background);
        }

        :global(.mobile-menu__content),
        .menu__group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .menu__group {
          width: 50%;
          padding-bottom: 0.5rem;
          text-align: center;
          font-weight: 300;
          font-size: 0.75rem;
        }

        :global(.mobile-menu__content) {
          z-index: 1000;
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--background);
          overflow: hidden;
        }

        .action-container__actions,
        .mobile-menu {
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
          position: relative;
          width: 100vw;
          padding: 0.75rem;
          display: flex;
          align-items: center;
        }

        .desktop-menu {
          display: none;
        }

        :global(.deploy-button) {
          width: 75px;
        }

        .action-container__always :global(.button-wrapper > .button) {
          min-width: 75px;
          font-size: 0.75rem;
        }

        @media screen and (min-width: 750px) {
          .desktop-menu {
            display: initial;
          }

          .mobile-menu {
            display: none;
          }

          .header {
            padding: 2rem;
            position: relative;
          }

          .action__login-container {
            padding-left: 0.25rem;
          }

          :global(.deploy-button) {
            width: initial;
          }

          .action-container__always :global(.button-wrapper > .button) {
            min-width: initial;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
