import React, { useEffect, useState } from 'react';
import axios from 'axios'

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// Shared components
import Portlet from 'components/Portlet';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';
import palette from 'theme/palette';
import styles from './styles';

// Chart data
const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      label: 'Success',
      backgroundColor: palette.primary.main,
      data: [32, 24, 37, 23, 10, 26, 13]
    },
    {
      label: 'Pending',
      backgroundColor: '#f48fb1',
      data: [10, 11, 13, 16, 11, 5, 9]
    }
  ]
};

// Chart options
const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    xAxes: [
      {
        maxBarThickness: 20,
        barPercentage: 1,
        categoryPercentage: 0.25,
        ticks: {},
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          callback: function(value) {
            const v = value;

            return v;
          }
        },
        gridLines: {
          color: palette.divider,
          drawBorder: false
        }
      }
    ]
  },
  responsiveAnimationDuration: 1000
};

const TabsChart = props => {

    const { classes, className, ...rest } = props;
    const rootClassName = classNames(classes.root, className);

    const [lastSevenDaysPo, setLastSevenDaysPo] = useState()


    useEffect(() => {
      getLastSevenDaysPo()
    }, [])

    const getLastSevenDaysPo = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/dashboard/lastseven");
        setLastSevenDaysPo(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    console.log(lastSevenDaysPo)

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent noPadding>
          <div className={classes.details}>
            <div className={classes.summary}>
            {/* {lastSevenDaysPo && (
              <div>
                <Typography variant="h1">{lastSevenDaysPo.length}</Typography>
                <Typography variant="body1">total PO</Typography>
              </div>
            )} */}
            <Typography variant="h1">240</Typography>
            <Typography variant="body1">total PO</Typography>
            </div>
            <div className={classes.legends}>
              <div className={classes.legend}>
                <span
                  className={classes.legendColor}
                  style={{ backgroundColor: palette.primary.main }}
                />
                <Typography varint="body1">Success</Typography>
              </div>
              <div className={classes.legend}>
                <span
                  className={classes.legendColor}
                  style={{ backgroundColor: '#f48fb1' }}
                />
                <Typography varint="body1">Pending</Typography>
              </div>
            </div>
          </div>
          <div className={classes.chart}>
            <Bar 
              data={data}
              options={options}
            />
          </div>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button variant="text">
            Last 7 days <ArrowDropDownIcon />
          </Button>
          <Button
            color="primary"
            variant="text"
          >
            Audience Overview <ArrowRightIcon />
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }

TabsChart.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabsChart);
