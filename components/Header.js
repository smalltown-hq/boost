import React, { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Logo from "vectors/Logo";
import Smile from "vectors/Smile";
import Heart from "vectors/Heart";
import Star from "vectors/Star";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Menu from "vectors/Menu";
import Button from "components/Button";
import useAuth from "hooks/useAuth";
import DeployService from "services/deploy";

const menuVariants = {
  open: { y: 0 },
  closed: {
    y: "-110vh",
  },
};

export default function Header(props) {
  const user = useAuth();
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const showAuthActions = !router.route.includes("login") && !user;

  const navigateToLogin = () => {
    if (!["/", "/login"].includes(router.asPath)) {
      localStorage.setItem("_bRedirectTo", router.asPath);
    }

    router.push("/login");
  };

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
              <div className="desktop-menu">
                <div style={{ paddingRight: "1rem" }}>
                  <strong style={{ paddingRight: "0.5rem" }}>
                    Welcome back!
                  </strong>{" "}
                  <Link href="/event/new">
                    <Button>Create event</Button>
                  </Link>
                </div>
              </div>
            )}
            <a
              href="https://vercel.com/import/project?template=https://github.com/flawk-community/boost"
              onClick={DeployService.log}
              style={{ marginRight: "1rem" }}
            >
              <VercelDeploy className="deploy-button" />
            </a>
            {showAuthActions && (
              <>
                <div className="desktop-menu">
                  <Button onClick={navigateToLogin}>Try boost now</Button>
                  <span className="action__login-container">
                    or{" "}
                    <a onClick={navigateToLogin} href="/login">
                      Log in
                    </a>
                  </span>
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
                    <div className="menu__group">
                      <a
                        href="https://vercel.com/import/project?template=https://github.com/flawk-community/boost"
                        onClick={DeployService.log}
                      >
                        <VercelDeploy height="48" />
                      </a>
                      Clone this app in one click
                    </div>
                    {user && (
                      <div className="menu__group">
                        <strong style={{ paddingRight: "0.5rem" }}>
                          Welcome back!
                        </strong>{" "}
                        <Link href="/event/new">
                          <Button>Create event</Button>
                        </Link>
                      </div>
                    )}
                    {showAuthActions && (
                      <div className="menu__group">
                        <Button onClick={navigateToLogin}>Try boost now</Button>
                        <span className="action__login-container">
                          or{" "}
                          <a onClick={navigateToLogin} href="/login">
                            Log in
                          </a>
                        </span>
                      </div>
                    )}
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
        </div>
      </div>
      <style jsx>{`
        :global(.mobile-menu__content),
        .menu__group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .menu__group {
          width: 50%;
          padding: 0.5rem 0;
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

        @media screen and (min-width: 750px) {
          .desktop-menu {
            display: initial;
          }

          .mobile-menu {
            display: none;
          }

          .header {
            padding: 2rem;
          }

          .action__login-container {
            padding-left: 0.25rem;
          }

          :global(.deploy-button) {
            width: initial;
          }
        }
      `}</style>
    </>
  );
}
