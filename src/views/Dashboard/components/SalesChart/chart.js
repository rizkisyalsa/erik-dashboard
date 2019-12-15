// Palette
import palette from 'theme/palette';

// Chart data
export const data = {
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
export const options = {
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
