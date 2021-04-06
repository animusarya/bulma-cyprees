import React from 'react';

const AddJob = () => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Customer</label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <input
            className="input is-danger"
            type="text"
            placeholder="e.g. Partnership opportunity"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AddJob;
