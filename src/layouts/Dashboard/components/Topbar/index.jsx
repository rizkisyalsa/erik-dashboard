import React, { Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../../../context/auth/authContext';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import SignoutIcon from '@material-ui/icons/ExitToAppOutlined';

// Component styles
import styles from './styles';

const Topbar = (props) => {

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = props;

    const rootClassName = classNames(classes.root, className);

    const handleSignOut = () => {
      logout();
      props.history.push('/sign-in');
    }

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            <div style={{flex:1, display: 'flex', justifyContent:'flex-end'}}>
            <IconButton
              className={classes.signOutButton}
              onClick={handleSignOut}
            >
              <SignoutIcon />
            </IconButton>
            </div>
          </Toolbar>
        </div>
      </Fragment>
    );
  }

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => { }
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
