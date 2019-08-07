import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const Onboarding = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="Name" placeholder="Name" />
        {touched.Name && errors.Name && (
          <p className="error">{errors.Name}</p>
        )}

<Field type="text" name="Password" placeholder="Password" />
        {touched.Password && errors.Password && <p className="error">{errors.Password}</p>}

        <Field type="text" name="Email" placeholder="Email" />
        {touched.Email && errors.Email && <p className="error">{errors.Email}</p>}

        <label className="checkbox-container">
          Terms
          <Field
            type="checkbox"
            name="Terms"
            checked={values.Terms}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {users.map(user => (
        <p key={user.name}>{user.password}>{user.email}</p>
      ))}
    </div>
  );
};

const FormikOnboarding = withFormik({
  mapPropsToValues({ name, password, email, terms }) {
    return {
      name: name || '',
      password: password || '',
      email: email || '',
      terms: terms || ''
    };
  },

  validationSchema: Yup.object().shape({
    species: Yup.string().required('You silly!!!'),
    size: Yup.string().required(),
    notes: Yup.string()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(Onboarding);

export default FormikOnboarding;
