import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import avatar from '../../../assets/png/avatar.png';
import './RightHeader.scss';

export default function RightHeader() {
  const { auth } = useAuth();

  return (
    <div className='right-header'>
      <Link to='/'>
        <Icon name='home' />
      </Link>
      <Icon name='plus' />
      <Link to={`/${auth.username}`}>
        <Image src={avatar} avatar />
      </Link>
    </div>
  );
}
