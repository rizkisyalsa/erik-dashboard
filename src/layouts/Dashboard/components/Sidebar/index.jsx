import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlineRounded';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';

// Component styles
import styles from './styles';

import ChangeFoto from '../../../../components/ChangeFoto/ChangeFoto';

const Sidebar = props => {
  const { classes, className } = props;
  const rootClassName = classNames(classes.root, className);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Link
          className={classes.logoLink}
          to="/"
        >
          <img
            alt="Brainalytica logo"
            className={classes.logoImage}
            src="/images/logos/pancamitra.png"
          />
        </Link>
      </div>
      <Divider className={classes.logoDivider} />
      {props.user && (
        <div
          className={classes.profile}
          onClick={handleOpen}
        >
          {props.user.foto ? (
            <Avatar
              className={classes.avatar}
              src={'http://localhost:8001/foto/' + props.user.foto}
            />
          ) : (
            <Avatar
              className={classes.avatar}
            />
          )}
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            {props.user.name}
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            {props.user.role}
          </Typography>
        </div>
      )}
      {open && (
        <ChangeFoto
          handleClose={handleClose}
          loadUser={props.loadUser}
          open={open}
          user={props.user}
        />
      )}
      <Divider className={classes.profileDivider} />
      {props.user && (
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
          {props.user.role === 'Marketing' && (
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/data-po"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Data PO"
              />
            </ListItem>
          )}
          {props.user.role === 'Kepala gudang jadi' && (
            <div>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/stok-barang"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Stok Barang"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/data-po"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Data PO"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/surat-jalan"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Surat Jalan"
                />
              </ListItem>
            </div>
          )}
          {props.user.role === 'Manager' && (
            <div>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/laporan"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Laporan"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/users"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Users"
                />
              </ListItem>
            </div>
          )}
        </List>
      )}

      {props.user && (
        <div>
          {props.user.role === 'admin' && (
            <List
              component="div"
              disablePadding
            >
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/stok-barang"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Stok Barang"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/data-po"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Data PO"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/surat-jalan"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Surat Jalan"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/laporan"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Laporan"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/users"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Users"
                />
              </ListItem>
            </List>
          )}
        </div>
      )}

      <Divider className={classes.listDivider} />
    </nav>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
