import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';



const NotFound: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {

    addToast({
      title: "Página não encontrada.",
      type: "info",
      description: "Aguarde 3s para ser redirecionado."
    })

    const timer = setTimeout(() => {
      history.push('/');

    }, 3000)

    return () => {

      clearTimeout(timer);
    };



  }, [history, addToast])

  return (
    <Container>
      <h2>404</h2>
    </Container>
  );
}


export default NotFound;
