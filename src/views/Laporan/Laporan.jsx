import React from 'react'

import DashboardLayout from 'layouts/Dashboard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   root: {
      padding: theme.spacing.unit * 4
   },
   item: {
      height: '100%'
   }
});

const Laporan = (props) => {
   const { classes } = props;
   return (
      <DashboardLayout title="Data PO">
         <div className={classes.root}>
            Laporan
         </div>
      </DashboardLayout>
   )
}

export default withStyles(styles)(Laporan);
