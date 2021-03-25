import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn } from 'react-icons/fi';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ToastVariations, useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErros from '../../utils/ValidationErros';
import { Background, Container, Content } from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

interface ResetPasswordPostData extends ResetPasswordFormData {
  token: string;
}

const ResetPassword: React.FC = () => {
  const location = useLocation();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object<ResetPasswordFormData>().shape({
          password: Yup.string().min(6, 'Informe sua senha.'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas estão diferentes',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?', '').replace('token=', '');
        if (!token) {
          throw new Error();
        }

        await api.post('password/reset', {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          token,
        } as ResetPasswordPostData);

        addToast({
          type: ToastVariations.SUCCESS,
          title: 'Senha alterada.',
          description: 'Sua senha foi alterada com sucesso.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: ToastVariations.ALERT,
          title: 'Erro ao resetar senha.',
          description:
            'Ocorreu um erro ao tentar resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo - GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resete sua senha</h1>

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
          />
          <Input
            icon={FiLock}
            name="passwordConfirmation"
            type="password"
            placeholder="Confirme sua nova senha"
          />

          <Button type="submit">Alterar Senha</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
