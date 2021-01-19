import React from 'react';
// import PropTypes from 'prop-types';
import { withFormik } from 'formik';
// import * as yup from 'yup';

import { Button, TextAreaGroup } from '../elements';

const CommentReplyForm = () => (
  <form
  // onSubmit={handleSubmit}
  >
    <TextAreaGroup
      border
      name="comment"
      // value={values.comment}
      // onChange={handleChange}
      // onBlur={handleBlur}
      // errors={errors.comment && touched.comment ? errors.comment : undefined}
    />
    <div className="field is-grouped is-pulled-right">
      <p className="control">
        <Button hasBorder type="button">
          Delete Reply
        </Button>
      </p>
      <p className="control">
        <Button type="button">Post Reply</Button>
      </p>
    </div>
  </form>
);

export default withFormik({
  mapPropsToValues: () => ({
    comment: '',
  }),
  // validationSchema: yup.object().shape({
  //   comment: yup.string().required('Comment is required!'),
  // }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    // console.log('handle submit', values, props);
    props.addContact(values);
    setSubmitting(false);

    resetForm();
  },
  displayName: 'ContactUs', // helps with React DevTools
})(CommentReplyForm);
