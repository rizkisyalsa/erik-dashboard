import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';

// Shared components
import Paper from 'components/Paper';

// Component styles
import styles from './styles';

class Budget extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
        style={{height: '118px'}}
      >
        <div className={classes.content}>
          <Typography
            className={classes.title}
            variant="body2"
          >
            Info
          </Typography>
          <div className={classes.details}>
            <Typography variant="h3">Welcome Erik Setiawan...</Typography>
            &nbsp; &nbsp; &nbsp; &nbsp;<Typography variant="h5" color="primary">(Admin gudang jadi)</Typography>
          </div>
        </div>
        <div className={classes.iconWrapper}>
          {/* <MoneyOutlinedIcon className={classes.icon} /> */}
        </div>
      </Paper>
    );
  }
}

Budget.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Budget);
