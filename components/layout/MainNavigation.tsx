import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {

  const ctx = useContext(AuthContext);
  const router = useRouter();

  const addActiveClass = (path: string) => {
    return router.pathname === path ? classes.marked : '';
  };
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetapp</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>
              <a className={addActiveClass('/')}></a>
            </Link>
          </li>
          {ctx.isLoggedIn && (
            <li>
              <Link href='/all-meetups'>
                <a className={addActiveClass('/all-meetups')}>All Meetups</a>
              </Link>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <Link href='/new-meetup'>
                <a className={addActiveClass('/new-meetup')}>Add New Meetup</a>
              </Link>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a onClick={ctx.onLogout}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
