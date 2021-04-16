/* eslint-disable no-shadow */

import React, { useState } from 'react';

import styled from 'styled-components';

const Button = styled.button`
  ::before {
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }
`;

const SurveyItem = ({ children, title }) => {
  const [expand, setExpand] = useState(false);

  return (
    <article className="message">
      <div
        className="message-header"
        onClick={() => setExpand((expand) => !expand)}>
        <p>{title}</p>
        <Button
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
