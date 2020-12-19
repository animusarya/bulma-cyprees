import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { Message } from '../components/elements';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

// TODO: attach when data available

const contactMutation = gql`
  mutation contact($name: String!, $email: String!, $message: String!) {
    contact(input: { name: $name, email: $email, message: $message }) {
      id
      name
      email
      message
    }
  }
`;
const Contact = () => {
  const [executeMutation, res] = useMutation(contactMutation);

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Contact</h1>
          <ContactForm
            onSubmit={(data) => executeMutation({ variables: data })}
          />
          {res.error && <Message type="error">{res.error.message}</Message>}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
