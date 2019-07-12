import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Dropzone } from '../components/elements';

const getHello = gql`
  {
    hello
  }
`;

const Test = () => {
  return (
    <Layout>
      <Seo title="Test" description="Some description here." />
      <div className="container">
        <Dropzone onUpload={data => console.log('onUpload', data)} />
        Test page
      </div>
    </Layout>
  );
};

const Test2 = () => {
  const todos = useStoreState(state => state.todos.items);
  const addTodo = useStoreActions(actions => actions.todos.addTodo);

  const id = 3;
  const singleItem = useStoreState(state => state.todos.getById(id), [id]);
  console.log('singleItem', singleItem);

  const [result] = useQuery({
    query: getHello,
  });
  console.log('result', result);

  return (
    <Layout>
      <Seo title="Test" description="Some description here." />
      <div className="container">
        <Dropzone onUpload={data => console.log('onUpload', data)} />
        Test page
        <button
          type="button"
          onClick={() => addTodo({ id: 3, name: 'Learn Easy Peasy' })}>
          add item
        </button>
        <ul>
          {todos.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Test;
