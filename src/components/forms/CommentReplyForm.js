import React from 'react';
import { withFormik } from 'formik';

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
        {/* <p className="control">
        <Button hasBorder type="button">
          Delete Reply
        </Button>
      </p> */}
        <p className="control">
          <Button disabled={isSubmitting} type="button">
            Post Reply
          </Button>
        </p>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => ({
    adminReply: initialValues.adminReply || '',
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    // console.log('handle submit', values, props);
    props.onSubmit(values).then(() => {
      setSubmitting(false);
    });
  },
  displayName: 'ContactUs', // helps with React DevTools
})(CommentReplyForm);
