import React, { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios'

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Grid from '@material-ui/core/Grid';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Custom components
import Budget from './components/Budget';
import Users from './components/Users';
import Paper from '@material-ui/core/Paper';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

const Dashboard = (props) => {
  
    const { classes } = props;

    const [lastSevenDaysPo, setLastSevenDaysPo] = useState()
    const [totalUser, setTotalUser] = useState()

    const getUser = async () => {
      try {
        const result = await axios.get('http://localhost:8001/api/user');
        setTotalUser(result.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      getLastSevenDaysPo()
      getUser()
    }, [])

    const getLastSevenDaysPo = async () => {

      function formatDate(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = dd+'/'+mm+'/'+yyyy;
        return date
      }  
    
      function Last7Days () {
          var result = [];
          for (var i=0; i<7; i++) {
              var d = new Date();
              d.setDate(d.getDate() - i);
              result.push( formatDate(d) )
          }
          return result
      }
    
    let a = Last7Days().map(data=> {
      return {
        tgl: data,
        success:0,
        pending:0}
    })

      try {
        const res = await axios.get("http://localhost:8001/api/dashboard/lastseven");

        a.forEach( (e,i)=> {
          res.data.forEach(f => {
            if(e.tgl === f.tgl_po && f.status === 'success'){
              a[i].success = a[i].success+1
            }
            if(e.tgl === f.tgl_po && f.status === 'pending'){
              a[i].pending = a[i].pending+1
            }
          })
        })
        setLastSevenDaysPo(a)
      } catch (err) {
        console.log(err)
      }
    }


    console.log(lastSevenDaysPo)

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={32}
          >
            <Grid
              item
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              sm={6}
              xl={3}
              xs={12}
            >
              <Users totalUser={totalUser}/>
            </Grid>
            <Grid
              item
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Progress /> */}
            </Grid>
            <Grid
              item
              sm={6}
              xl={3}
              xs={12}
            >
              {/* <Profit /> */}
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <div style={{ marginTop: '30px' }}>
                <Paper>
                  <div style={{ width: '100%', height: 300, padding:'30px' }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={lastSevenDaysPo}
                        height={250}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        width={730}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#68ff60"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#68ff60"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorPv"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ff2828"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ff2828"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="tgl" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          dataKey="success"
                          fill="url(#colorUv)"
                          fillOpacity={1}
                          stroke="#68ff60"
                          type="monotone"
                        />
                        <Area
                          dataKey="pending"
                          fill="url(#colorPv)"
                          fillOpacity={1}
                          stroke="#ff2828"
                          type="monotone"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
