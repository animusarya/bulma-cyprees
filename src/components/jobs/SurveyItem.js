/* eslint-disable no-shadow */

import React, { useState } from 'react';

const SurveyItem = ({ children, title }) => {
  const [expand, setExpand] = useState(false);

  return (
    <article className="message">
      <div
        className="message-header"
        onClick={() => setExpand((expand) => !expand)}>
        <p>{title}</p>
        <button
          type="button"
          className={expand ? 'delete' : ''}
          aria-label="delete"
        />
      </div>
      {expand && <div className="message-body">{children}</div>}
    </article>
  );
};

export default SurveyItem;
