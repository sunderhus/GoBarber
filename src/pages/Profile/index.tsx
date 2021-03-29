import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { ToastVariations, useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErros from '../../utils/ValidationErros';
import { AvatarInput, Container, Content } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', formData).then(response => {
          updateUser(response.data);

          addToast({
            type: ToastVariations.SUCCESS,
            title: 'Avatar Atualizado.',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Informe um e-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: fieldTextValue => fieldTextValue.length > 0,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'Mínimo de 6 dígitos.'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: fieldTextValue => fieldTextValue.length > 0,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          email,
          name,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        addToast({
          type: ToastVariations.SUCCESS,
          title: 'Perfil atualizado.',
          description:
            'Suas informações de perfil foram atualizadas com sucesso.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: ToastVariations.ERROR,
          title: 'Erro na atualização do cadastro.',
          description: 'Verifique os dados usados e tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input
                onChange={handleAvatarChange}
                type="file"
                name="avatar"
                id="avatar"
              />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <div>
            <Input icon={FiUser} name="name" placeholder="Nome" tabIndex={0} />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
          </div>

          <Input
            icon={FiLock}
            name="oldPassword"
            type="password"
            placeholder="Senha atual"
          />
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
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
