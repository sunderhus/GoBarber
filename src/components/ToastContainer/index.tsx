import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast/index';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransaction = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120px',
        opacity: 0,
      },
    },
  );

  return (
    <Container>
      {messageWithTransaction.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
