import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { useParams } from 'react-router-dom';

import Layout from '../../components/Layout';
import { JobTable } from '../../components/jobs';
import DashboardMenu from '../../components/global/DashboardMenu';

const tableData = [
  {
    jobNumber: 120081,
    site: 'Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 90082,
    site: 'Tables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 90083,
    site: 'Anger Menu',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 70084,
    site: 'Smart Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 70085,
    site: 'Micky',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 10284,
    site: 'The Stables',
    dueDate: '9/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 600824,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 3020384,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 20290084,
    site: 'The Stables',
    dueDate: '19/09/20',
    assigned: 'Richard',
    status: true,
  },
];

const Jobs = () => {
  const { status } = useParams();
  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';
  const [query, setUpdateQuery] = useState('');
  const fuse = new Fuse(tableData, {
    keys: ['jobNumber', 'site', 'dueDate'],
    includeScore: true,
  });

  const results = fuse.search(query);

  const characterResults = query
    ? results.map((character) => character.item)
    : tableData;

  const onSearch = ({ currentTarget }) => {
    setUpdateQuery(currentTarget.value);
  };

  return (
    <Layout>
      <DashboardMenu
        value={query}
        onChange={onSearch}
        hasSearchMenu
        heading={heading}>
        <JobTable tableData={characterResults} status={status} />
      </DashboardMenu>
    </Layout>
  );
};
export default Jobs;
