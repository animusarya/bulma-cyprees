/* eslint-disable no-shadow */

import React, { useState } from 'react';

const SurveyItem = ({ children, title }) => {
  const [expand, setExpand] = useState(false);

  return (
    <article className="message">
      <div
        className="message-header has-background-link"
        onClick={() => setExpand((expand) => !expand)}>
        <p>{title}</p>
        <button
          type="button"
          className={expand ? 'delete' : ''}
          aria-label="delete"
        />
      </div>
      {expand && (
        <div className="message-body has-background-white">{children}</div>
      )}
    </article>
  );
};

export default SurveyItem;
