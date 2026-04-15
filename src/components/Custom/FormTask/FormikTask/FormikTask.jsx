import { useFormik } from "formik";
import styles from "./formikTask.module.css";

function validate(values) {
  const errors = {};

  // First Name: 5-20 simvol
  if (!values.firstName) {
    errors.firstName = "Ad tələb olunur";
  } else if (values.firstName.length < 5) {
    errors.firstName = "Ad minimum 5 simvol olmalıdır";
  } else if (values.firstName.length > 20) {
    errors.firstName = "Ad maksimum 20 simvol olmalıdır";
  }

  // Age: müsbət rəqəm, 1-dən böyük
  if (!values.age) {
    errors.age = "Yaş tələb olunur";
  } else if (isNaN(values.age)) {
    errors.age = "Yaş rəqəm olmalıdır";
  } else if (Number(values.age) < 1) {
    errors.age = "Yaş 1-dən böyük olmalıdır";
  }

  // Terms and Conditions: checkbox işarələnməlidir
  if (!values.terms) {
    errors.terms = "Şərtləri qəbul etməlisiniz";
  }

  return errors;
}

function FormikTask() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      age: "",
      terms: false,
    },
    validate,
    onSubmit: (values) => {
      console.log("Submitted data:", values);
    },
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Formik Form</h2>

      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>

        {/* First Name */}
        <div className={styles.field}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Adınızı daxil edin"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.firstName && formik.errors.firstName
                ? styles.inputError
                : formik.touched.firstName
                ? styles.inputOk
                : ""
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className={styles.error}>{formik.errors.firstName}</p>
          )}
        </div>

        {/* Age */}
        <div className={styles.field}>
          <label className={styles.label}>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Yaşınızı daxil edin"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.age && formik.errors.age
                ? styles.inputError
                : formik.touched.age
                ? styles.inputOk
                : ""
            }`}
          />
          {formik.touched.age && formik.errors.age && (
            <p className={styles.error}>{formik.errors.age}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className={styles.checkboxField}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.checkbox}
          />
          <label htmlFor="terms" className={styles.checkboxLabel}>
            Şərtlər və Qaydaları qəbul edirəm
          </label>
        </div>
        {formik.touched.terms && formik.errors.terms && (
          <p className={styles.error}>{formik.errors.terms}</p>
        )}

        <button
          type="submit"
          className={styles.btn}
          disabled={!formik.isValid || !formik.dirty}
        >
          Göndər
        </button>
      </form>
    </div>
  );
}

export default FormikTask;
