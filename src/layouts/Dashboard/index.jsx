import React, { useState, useEffect, useContext, Fragment } from 'react';

import AuthContext from '../../context/auth/authContext'

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

// Material components
import Drawer from '@material-ui/core/Drawer';

// Custom components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';

// Component styles
import styles from './styles';

const DashboardLayout = props => {
  const authContext = useContext(AuthContext)

  const isMobile = ['xs', 'sm', 'md'].includes(props.width);
  const [state, setState] = useState({
    isOpen: !isMobile
  });

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
 }, [])

  const handleClose = () => {
    setState({ isOpen: false });
  };

  const handleToggleOpen = () => {
    setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  const { classes, width, title, children } = props;
  const { isOpen } = state;

  const shiftTopbar = isOpen && !isMobile;
  const shiftContent = isOpen && !isMobile;

  return (
    <Fragment>
      <Topbar
        className={classNames(classes.topbar, {
          [classes.topbarShift]: shiftTopbar
        })}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={isMobile ? 'temporary' : 'persistent'}>
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: shiftContent
        })}>
        {children}
        <Footer />
      </main>
    </Fragment>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(DashboardLayout);
