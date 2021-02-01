import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { Button, TextAreaGroup } from '../elements';

const CommentReplyForm = (props) => {
  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaGroup
        border
        name="adminReply"
        value={values.adminReply}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Button disabled={isSubmitting || !values.adminReply} type="submit">
            Post Reply
          </Button>
        </p>
      </div>
    </form>
  );
};

CommentReplyForm.propTypes = {
  values: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: () => ({
    adminReply: '',
  }),

  validationSchema: yup.object().shape({
    adminReply: yup.string().required('Reply is required!'),
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CommentReplyForm', // helps with React DevTools
})(CommentReplyForm);
