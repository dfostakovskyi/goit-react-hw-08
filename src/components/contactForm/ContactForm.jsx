import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styles from "./contactForm.module.css";

const ContactForm = ({ addContact }) => (
  <div>
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Too short")
          .max(50, "Too long")
          .required("Required"),
        number: Yup.string()
          .matches(/^[\d+-]+$/, "Must be a valid phone number")
          .min(3, "Too short")
          .max(50, "Too long")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addContact(values.name, values.number);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" className={styles.input} />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="number">Number</label>
            <Field
              id="number"
              name="number"
              type="text"
              className={styles.input}
            />
            <ErrorMessage name="number" component="div" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
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
