import { useState } from 'react';
import Fuse from 'fuse.js';

const useSearchFilter = () => {
  const [query, setUpdateQuery] = useState('');
  const [allData, setAllData] = useState([]);
  const fuse = new Fuse(allData, {
    keys: ['jobNumber', 'site', 'dueDate', 'assigned'],
    includeScore: true,
  });

  const results = fuse.search(query);

  const characterResults =
    query !== '' ? results.map((character) => character.item) : allData;

  console.log(characterResults, query);

  const onSearch = ({ currentTarget }) => {
    setUpdateQuery(currentTarget.value);
    setAllData(characterResults);
  };

  return [allData, query, { onSearch, setAllData }];
};
export default useSearchFilter;
