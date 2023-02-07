import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';
import './RegisterForm.scss';

export default function RegisterForm({ setShowLogin }) {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required('Tu nombre es obligatorio'),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/)
        .required('El nombre debe contener solo caracteres alfanumericos'),
      email: Yup.string()
        .email('El correo insertado no es valido')
        .required('El correo es Obligatorio'),
      password: Yup.string()
        .required('La Contraseña es Obligatoria')
        .oneOf([Yup.ref('repeatPassword')], 'Las Contraseñas no son Iguales'),
      repeatPassword: Yup.string()
        .required('Repeticion de Contraseña Obligatoria')
        .oneOf([Yup.ref('password')], 'Las Contraseñas no son Iguales'),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success('usuario registrado correctamente');
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <h2 className='form-title'>
        Registrate para ver fotos y videos de tus amigos
      </h2>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && true}
          placeholder='Nombre y Apellidos'
          name='name'
        />
        <Form.Input
          type='text'
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username && true}
          placeholder='Nombre de Usuario'
          name='username'
        />
        <Form.Input
          type='text'
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email && true}
          placeholder='Correo electronico'
          name='email'
        />
        <Form.Input
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password && true}
          placeholder='Contraseña'
          name='password'
        />
        <Form.Input
          type='password'
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword && true}
          placeholder='Repetir Contraseña'
          name='repeatPassword'
        />

        <Button type='submit' className='btn-submit'>
          Registrarse
        </Button>
        {/*         <Button type='button' onClick={formik.handleReset}>
          Reiniciar Formulario
        </Button> */}
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  };
}
