import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const ContactForm = ({ addContact }) => (
  <div>
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Must be at least 3 characters")
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        number: Yup.string()
          .min(3, "Must be at least 3 characters")
          .max(50, "Must be 50 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addContact(values.name, values.number);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <Field name="number" type="text" placeholder="Number" />
            <ErrorMessage name="number" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
