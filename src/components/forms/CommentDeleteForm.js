import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

import { Button, TextAreaGroup } from '../elements';

const CommentDeleteForm = (props) => {
  const { values, handleChange, handleBlur, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaGroup
        border
        name="adminReply"
        value={values.adminReply}
        onChange={handleChange}
        onBlur={handleBlur}
        readonly
      />
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Button hasBorder type="submit">
            Delete Reply
          </Button>
        </p>
      </div>
    </form>
  );
};

CommentDeleteForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => ({
    adminReply: initialValues.adminReply || '',
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'CommentDeleteForm', // helps with React DevTools
})(CommentDeleteForm);
