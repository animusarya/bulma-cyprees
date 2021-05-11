import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const useSearchFilter = (filter) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  const fuse = new Fuse(allData, {
    keys: filter,
    includeScore: true,
  });

  const results = fuse.search(searchQuery);

  const characterResults = results.map((character) => character.item);

  const onSearch = ({ currentTarget }) => {
    if (currentTarget.value.length > 0) {
      setSearchQuery(currentTarget.value);
      setFilteredData(characterResults);
    } else {
      setFilteredData(allData);
    }
  };

  return [filteredData, { onSearch, setAllData }];
};

export default useSearchFilter;
