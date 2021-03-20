import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import { ToastVariations, useToast } from '../../hooks/toast';

const NotFound: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    addToast({
      title: 'Página não encontrada.',
      type: ToastVariations.INFO,
      description: 'Aguarde 3s para ser redirecionado.',
    });

    const timer = setTimeout(() => {
      history.goBack();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [history, addToast]);

  return (
    <Container>
      <h2>404</h2>
    </Container>
  );
};

export default NotFound;
