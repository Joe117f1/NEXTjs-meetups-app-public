import classes from './Container.module.css';

const Container:React.FC = props => {
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  );
};

export default Container;