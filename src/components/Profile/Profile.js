import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import { Grid, Image } from 'semantic-ui-react';
import ImageNoFound from '../../assets/png/avatar.png';
import UserNotFound from '../UserNotFound';
import './Profile.scss';
import ModalBasic from '../Modal/ModalBasic';
import AvatarForm from '../User/AvatarForm';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Profile({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState(null);

  const { auth } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  const { getUser } = data;

  const handlerModal = (type) => {
    switch (type) {
      case 'avatar':
        setTitleModal('Cambiar Foto de Perfil');
        setChildrenModal(<AvatarForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid className='profile'>
        <Grid.Column width={5} className='profile__left'>
          <Image
            src={ImageNoFound}
            alt='notFound'
            avatar
            onClick={() => username === auth.username && handlerModal('avatar')}
          />
        </Grid.Column>
        <Grid.Column width={11} className='profile__right'>
          <div>Header Profile</div>
          <div>Followers</div>
          <div className='other'>
            <p className='name'>{getUser.name}</p>

            {getUser.website && (
              <a href={getUser.website} className='website' target='_blank'>
                {getUser.website}
              </a>
            )}
            {getUser.description && (
              <p className='description'>{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
