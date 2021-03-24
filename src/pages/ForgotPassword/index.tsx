import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ToastVariations, useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErros from '../../utils/ValidationErros';
import { Background, Container, Content } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Informe um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        // recuperação de senha
        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: ToastVariations.SUCCESS,
          title: 'E-mail de recuperação enviado',
          description:
            'Um E-mail de recuperação foi enviado a recuperação de senha. Verifique sua caixa de entrada.✂',
        });

        // history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: ToastVariations.ERROR,
          title: 'Detectamos um problema',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha. Verifique o e-mail informado e tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo - GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiArrowLeft size="16" />
          Voltar para login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
