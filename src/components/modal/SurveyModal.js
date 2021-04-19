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
    <SurveyItem title="Frame Glass">form1</SurveyItem>
    <SurveyItem title="Frame Glass">form1</SurveyItem>
  </Modal>
);

export default SurveyModal;
