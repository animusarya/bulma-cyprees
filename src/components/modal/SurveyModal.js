import React from 'react';

import { Modal } from '../elements';
import { EditJobForm } from '../forms';
import { SurveyItem } from '../jobs';

const SurveyModal = ({ onClose, isActive }) => (
  <Modal isActive={isActive} onClose={onClose}>
    <SurveyItem title="Frame Survey">
      <EditJobForm />
    </SurveyItem>
    <SurveyItem title="Frame Glass">form1</SurveyItem>
    <SurveyItem title="Frame Glass">form1</SurveyItem>
  </Modal>
);

export default SurveyModal;
