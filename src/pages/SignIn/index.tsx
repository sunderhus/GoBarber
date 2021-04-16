import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { ToastVariations, useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/ValidationErros';
import { Background, Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object<SignInFormData>().shape({
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Informe um e-mail válido'),
          password: Yup.string().min(6, 'Informe sua senha.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: ToastVariations.ALERT,
          title: 'Erro na autenticação...',
          description:
            'Verifique o e-mail e senha usados no login e tente novamente.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo - GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" tabIndex={0} />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>

        <Link to="/signup">
          <FiLogIn size="16" />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
