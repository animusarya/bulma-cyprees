import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

import { Button, TextAreaGroup } from '../elements';

const CommentReplyForm = (props) => {
  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
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
        {values.adminReply.length > 0 && (
          <p className="control">
            <Button
              hasBorder
              type="submit"
              onClick={() => setFieldValue('function', 'delete')}>
              Delete Reply
            </Button>
          </p>
        )}
        <p className="control">
          <Button
            disabled={isSubmitting}
            type="submit"
            onClick={() => setFieldValue('function', 'submit')}>
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
  mapPropsToValues: ({ initialValues }) => ({
    function: '',
    adminReply: initialValues.adminReply || '',
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CommentReplyForm', // helps with React DevTools
})(CommentReplyForm);
