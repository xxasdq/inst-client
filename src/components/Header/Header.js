import './Header.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/png/instaclone.png';
import RightHeader from './RightHeader';

export default function Header() {
  return (
    <div className='header'>
      <Container>
        <Grid>
          <Grid.Column width={3} className='header__logo'>
            <Link to='/'>
              <Image src={logo} alt='instaclone' />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>buscador</Grid.Column>
          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
