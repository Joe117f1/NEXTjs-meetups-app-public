import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

const Layout: React.FC = props => {
  
  const ctx = useContext(AuthContext);
  const [islogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    ctx.isLoggedIn ? setIsLogged(true) : setIsLogged(false);
  }, [ctx]);

  const background = islogged ? '' : classes.background;

  return (
    <div className={background}>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
