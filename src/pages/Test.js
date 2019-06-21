import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Test = () => {
  const todos = useStoreState(state => state.todos.items);
  const addTodo = useStoreActions(actions => actions.todos.addTodo);

  const id = 3;
  const singleItem = useStoreState(state => state.todos.getById(id), [id]);
  console.log('singleItem', singleItem);

  return (
    <Layout>
      <Seo title="About" description="Some description here." />
      <div className="container">
        Test page
        <button onClick={() => addTodo({id:3,name:'Learn Easy Peasy'})}>add item</button>
        <ul>
          {todos.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Test;
