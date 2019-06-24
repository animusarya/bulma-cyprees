import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'urql';

import { InputGroup, Button } from './elements';

const loginMutation = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

// const loginMutation = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       email
//     }
//   }
// `;

// class LoginForm extends React.Component {
//   state = {
//     error: null
//   };

//   add = () => {
//     this.props.loginMutation({ email: '' })
//       .catch(error => {
//         this.setState({ error });
//       });
//   };

//   render() {
//     const {
//       values,
//       touched,
//       errors,
//       isSubmitting,
//       handleChange,
//       handleBlur,
//       handleSubmit
//     } = this.props;

//     if (this.state.error) {
//       return 'Oh no!';
//     }

//     return (
//       <form onSubmit={handleSubmit}>
//         <InputGroup
//           label="Email:"
//           name="email"
//           placeholder="john@doe.com"
//           value={values.email}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           errors={errors.email && touched.email ? errors.email : undefined} />
//         <InputGroup
//           label="Password:"
//           name="password"
//           placeholder="*********"
//           value={values.password}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           errors={errors.password && touched.password ? errors.password : undefined} />
//         <div className="field">
//           <div className="control">
//             <Button
//               disabled={isSubmitting}
//               onClick={() => executeMutation({ email: "" })}
//             >
//               Login
//           </Button>
//             <button onClick={this.add}>Login</button>
//           </div>
//         </div>
//       </form>);
//   }
// }

// const WithMutation = () => (
//   <Mutation query={loginMutation}>
//     {({ executeMutation }) => <LoginForm loginMutation={executeMutation} />}
//   </Mutation>
// );

const LoginForm = props => {
  const [res, executeMutation] = useMutation(loginMutation);
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  if (res.error) {
    return "Oops!!! Something went wrong";
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        label="Email:"
        name="email"
        placeholder="john@doe.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.email && touched.email ? errors.email : undefined} />
      <InputGroup
        label="Password:"
        name="password"
        type="password"
        placeholder="*********"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.password && touched.password ? errors.password : undefined} />
      <div className="field">
        <div className="control">
          <Button
            disabled={isSubmitting}
            onClick={() => executeMutation({ email: "", password: "" })}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: yup.string().required('Password is required!')
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.addContact(values);
    setSubmitting(false);

  },
  displayName: 'LoginForm' // helps with React DevTools
})(LoginForm);
