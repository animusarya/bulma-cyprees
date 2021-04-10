import React from 'react';

import { InputGroup } from '../elements';

function SearchBar(props) {
  const { value, onChange } = props;

  return (
    <div>
      <InputGroup
        placeholder="Search..."
        smallInput
        label="Search:"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
