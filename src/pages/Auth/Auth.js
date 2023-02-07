import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import RegisterForm from '../../components/Auth/RegisterForm/RegistrForm';
import instaclone from '../../assets/png/instaclone.png';
import './Auth.scss';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className='auth'>
      <Image src={instaclone} alt='instaclone' />

      <div className='container-form'>
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className='change-form'>
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
            </>
          ) : (
            <>
              ¡Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar seción
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
