import { Formik, Form } from "formik";
import * as Yup from "yup";
import Router from "next/router";
import Input from "components/Input";
import Label from "components/Label";
import Field from "components/Field";
import Button from "components/Button";
import Redirect from "components/Redirect";
import useAuth from "hooks/useAuth";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import ApiService from "lib/api";

const EventSchema = Yup.object().shape({
  name: Yup.string().required("Without a name, there can be no event."),
});

export default function NewEvent() {
  const user = useAuth({ redirectTo: "/login" });

  const handleSubmit = async (values, formikContext) => {
    const eventCreateRequest = await ApiService.post("/api/events/create", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (eventCreateRequest.ok) {
      formikContext.resetForm();
      await Router.push(`/event/${await eventCreateRequest.text()}`);
    } else {
      formikContext.setFieldError({
        name:
          (await eventCreateRequest.text()) || "An unexpected error occured.",
      });
    }
  };

  return (
    <>
      <Redirect redirectTo="/login" />
      <section className="main">
        <div className="main__content">
          <h1 className="main__title">Get your event link!</h1>
          <p className="main__details">
            Once you have a link, share it so people can ask question and give
            your presenters some love!
          </p>
          <Formik
            validationSchema={EventSchema}
            initialValues={{ name: "" }}
            onSubmit={handleSubmit}
          >
            {({ getFieldProps, isSubmitting, touched, errors, isValid }) => (
              <Form>
                <Field error={touched.name && errors.name}>
                  <Label htmlFor="name">Event name</Label>
                  <Input {...getFieldProps("name")} />
                </Field>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!isValid}
                >
                  Boost my event!
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
          bottom: -1%;
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
