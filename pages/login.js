import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Router from "next/router";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Input from "components/Input";
import Label from "components/Label";
import Field from "components/Field";
import Button from "components/Button";
import useAuth from "hooks/useAuth";
import MagicClientService from "services/magic-client";
import ApiService from "services/api";

const SignInUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required(
      "We require an email to allow you to log in or create an account."
    ),
});

export default function Login() {
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  // Magic link needs to load an iFrame, we block in UI
  // until that frame is loaded
  const [isMagicLinkReady, setIsMagicLinkReady] = useState(false);

  useEffect(() => {
    // On mount of the component, preload the magic link iframe
    MagicClientService.preload().then(() => {
      setIsMagicLinkReady(true);
    });
  }, []);

  const handleSubmit = async (values, formikContext) => {
    if (!isMagicLinkReady) return;

    // get decentralized id token from magic link which we can use
    // to authorize requests
    const { did, error } = await MagicClientService.login(values.email);

    setShowDialog(true);

    if (error) {
      formikContext.setFieldError("email", error);

      return;
    }

    // login to our system and persist your user account
    // which is just an email. We also encrypt and set
    // a cookie here that can be used for in later requests
    const authRequest = await ApiService.post("/api/login", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${did}`,
      },
      body: JSON.stringify(values),
    });

    if (authRequest.ok) {
      const redirectTo = localStorage.getItem("_bRedirectTo") || "/dashboard";
      localStorage.removeItem("_bRedirectTo");

      Router.push(redirectTo);
    } else {
      formikContext.setFieldError({ email: await authRequest.text() });
    }
  };

  return (
    <>
      <Head>
        <script async>
          {`
            if (document.cookie && document.cookie.indexOf('authed') > -1) {
              window.location.href = "/";
            }
          `}
        </script>
      </Head>
      <section className="main">
        <div className="main__content">
          <h1 className="main__title">Welcome!</h1>
          <p className="main__details">
            We are all about simple interactions. So much so that we don’t even
            require a password!
          </p>
          <Formik
            validationSchema={SignInUpSchema}
            initialValues={{ email: "" }}
            onSubmit={handleSubmit}
          >
            {({ getFieldProps, isSubmitting, touched, errors, isValid }) => (
              <Form>
                <Field error={touched.email && errors.email}>
                  <Label htmlFor="email">Email</Label>
                  <Input {...getFieldProps("email")} />
                </Field>
                <Button
                  type="submit"
                  loading={isSubmitting || !isMagicLinkReady}
                  disabled={!isValid}
                >
                  Log in <span style={{ fontWeight: "normal" }}>or</span> Sign
                  up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <HomeIcon className="main__icon" />
        <Curve className="main__curve" />
      </section>
      <style jsx>{`
        :global(.main__icon) {
          position: absolute;
          right: 20%;
          bottom: -2.5%;
          z-index: 1;
          display: none;
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
          font-size: 2.75rem;
        }

        .main__content {
          max-width: 500px;
        }

        .main {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 120px);
          width: 100vw;
          overflow: hidden;
          padding: 0 1rem;
        }

        @media screen and (min-width: 750px) {
          .main {
            min-height: calc(100vh - 120px);
          }

          :global(.main__icon) {
            display: initial;
          }
        }
      `}</style>
    </>
  );
}
