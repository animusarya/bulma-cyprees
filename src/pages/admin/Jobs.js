import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Fuse from 'fuse.js';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import { JobTable } from '../../components/jobs';
import DashboardMenu from '../../components/global/DashboardMenu';
// import useSearchFilters from '../../hooks/useSearchFilter';

const tableData = [
  {
    jobNumber: 12001,
    site: 'Stables',
    dueDate: '29/09/20',
    assigned: 'Obama',
    status: true,
  },
  {
    jobNumber: 12002,
    site: 'Tables',
    dueDate: '29/09/20',
    assigned: 'Dan',
    status: true,
  },
  {
    jobNumber: 12003,
    site: 'Anger Menu',
    dueDate: '29/09/20',
    assigned: 'Julia',
    status: true,
  },
  {
    jobNumber: 12004,
    site: 'Smart Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 12005,
    site: 'Micky',
    dueDate: '29/09/20',
    assigned: 'Mark',
    status: true,
  },
  {
    jobNumber: 12006,
    site: 'The Stables',
    dueDate: '9/09/20',
    assigned: 'Steve',
    status: true,
  },
  {
    jobNumber: 12007,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Kel',
    status: true,
  },
  {
    jobNumber: 12008,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Maxwell',
    status: true,
  },
  {
    jobNumber: 12009,
    site: 'The Stables',
    dueDate: '19/09/20',
    assigned: 'Harry',
    status: true,
  },
];

const Jobs = () => {
  const { status } = useParams();
  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';

  const [query, setUpdateQuery] = useState('');
  const fuse = new Fuse(tableData, {
    keys: ['jobNumber', 'site', 'dueDate', 'assigned'],
    includeScore: true,
  });

  const results = fuse.search(query);

  const characterResults = query
    ? results.map((character) => character.item)
    : tableData;

  const onSearch = ({ currentTarget }) => {
    setUpdateQuery(currentTarget.value);
  };

  // const [allData, query, { onSearch, setAllData }] = useSearchFilters();

  // useEffect(() => {
  //   if (tableData) setAllData(tableData);
  // }, [tableData]);

  return (
    <Layout>
      <Seo title="Job page" description="View All Jobs" />

      <DashboardMenu
        value={query}
        // onChange={onSearch}
        onChange={(filters) => onSearch(filters, tableData)}
        hasSearchMenu
        heading={heading}>
        <JobTable tableData={characterResults} status={status} />
      </DashboardMenu>
    </Layout>
  );
};
export default Jobs;
