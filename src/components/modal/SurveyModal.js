import React from 'react';

import { Modal, Heading } from '../elements';
import { FrameSurveyForm } from '../forms';
import { SurveyItem } from '../jobs';

const SurveyModal = ({ onClose, isActive }) => (
  <Modal isActive={isActive} onClose={onClose}>
    <Heading>Select Survey Type</Heading>
    <SurveyItem title="Frame Survey">
      <FrameSurveyForm />
    </SurveyItem>
    <SurveyItem title="Frame Glass">
      <FrameSurveyForm />
    </SurveyItem>
    <SurveyItem title="Glass Survey">
      <FrameSurveyForm />
    </SurveyItem>
  </Modal>
);

export default SurveyModal;
