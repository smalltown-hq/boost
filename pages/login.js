import { Magic } from "magic-sdk";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Router from "next/router";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Input from "components/Input";
import Label from "components/Label";
import Field from "components/Field";
import Button from "components/Button";
import Redirect from "components/Redirect";
import useAuth from "hooks/useAuth";
import ApiService from "lib/api";

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

  const handleSubmit = async (values, formikContext) => {
    // get decentralized id token from magic link which we can use
    // to authorize requests
    const did = await new Magic(
      process.env.NEXT_PUBLIC__MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: values.email });

    setShowDialog(true);

    // login to our system and persist your user account
    // which is just an email. We also encrypt and set
    // a cookie here that can be used for in later requests
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
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
      <Redirect redirectOnUser redirectTo="/dashboard" />
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
                  loading={isSubmitting}
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
