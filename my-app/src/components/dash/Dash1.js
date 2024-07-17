import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Logo from './Logo.svg';

const Dash1 = () => {
  const [counters, setCounters] = useState({
    totalProjects: 0,
    closedProjects: 0,
    runningProjects: 0,
    closureDelay: 0,
    cancelledProjects: 0
  });

  useEffect(() => {
    fetchCounters();
  }, []);

  const fetchCounters = () => {
    axios.get('/api/dashboard/counters', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setCounters(response.data);
    })
    .catch(error => {
      console.error('Error fetching counters:', error);
    });
  };

  const [chartData, setChartData] = useState(null);

    useEffect(() => {
      fetchChartData();
    }, []);
  
    const fetchChartData = () => {
      axios.get('/api/dashboard/chart-data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          setChartData(response.data);
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
        });
    };
  
    const options = {
      series: [
        {
          name: 'Total',
          data: chartData ? chartData.totalData : []
        },
        {
          name: 'Closed',
          data: chartData ? chartData.closedData : []
        }
      ],
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR']
      },
      yAxis: {
        title: {
          text: ''
        }
      }
    };


  // const options = {
  //   series: [
  //     {
  //       name: 'Total',
  //       data: [19, 7, 9, 15, 5, 10]
  //     },
  //     {
  //       name: 'Closed',
  //       data: [14, 6, 8, 15, 5, 9]
  //     }
  //   ],
  //   chart: {
  //     type: 'column'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   xAxis: {
  //     categories: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR']
  //   },
  //   yAxis: {
  //     title: {
  //       text: ''
  //     }
  //   }
  // };

  return (
    <div>
      <img src={Logo} alt="Logo" className="logo"/>
      <div className="section1 row" style={{ paddingTop: '71px' }}>
        <div className="col-sm-2">
          <div className="card">
            <h4>Total Projects</h4>
            <p>{counters.totalProjects}</p>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="card">
            <h4>Closed</h4>
            <p>{counters.closedProjects}</p>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="card">
            <h4>Running</h4>
            <p>{counters.runningProjects}</p>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="card">
            <h4>Closure Delay</h4>
            <p>{counters.closureDelay}</p>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="card">
            <h4>Cancelled</h4>
            <p>{counters.cancelledProjects}</p>
          </div>
        </div>
      </div>
      <div className='card-header'>
        <h6>Department wise - Total Vs Closed</h6>
        <div className='chart-card'>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default Dash1;



















// ................................................. 
// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import axios from 'axios';

// const Dash1 = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   const fetchChartData = () => {
//     axios.get('/api/dashboard/chart-data', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then(response => {
//         setChartData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching chart data:', error);
//       });
//   };

//   const options = {
//     series: [
//       {
//         name: 'Total',
//         data: chartData ? chartData.totalData : []
//       },
//       {
//         name: 'Closed',
//         data: chartData ? chartData.closedData : []
//       }
//     ],
//     chart: {
//       type: 'column'
//     },
//     title: {
//       text: ''
//     },
//     xAxis: {
//       categories: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR']
//     },
//     yAxis: {
//       title: {
//         text: ''
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="section1 row" style={{ paddingTop: '71px' }}>
//         {/* Cards or other content here */}
//         <div>
//        <div className="section1 row" style={{paddingTop: '71px'}}>
//          <div className="col-sm-2">
//            <div className="card">
//              <h4>Total Projects</h4>
//              <p>8</p>
//            </div>
//          </div>
//          <div className="col-sm-2">
//            <div className="card">
//              <h4>Closed</h4>
//              <p>2</p>
//            </div>
//          </div>
//          <div className="col-sm-2">
//            <div className="card">
//              <h4>Running</h4>
//              <p>3</p>
//            </div>
//          </div>
//          <div className="col-sm-2">
//            <div className="card">
//              <h4>Closure Delay</h4>
//              <p>2</p>
//            </div>
//          </div>
//          <div className="col-sm-2">
//            <div className="card">
//              <h4>Cancelled</h4>
//             <p>3</p>
//            </div>
//          </div>
//        </div>
//       </div>
//       <div className='card-header'>
//         Department wise - Total Vs Closed
//         <div>Chart Content Goes Here</div>
//         <div className='chart-card'>
//           <HighchartsReact
//             highcharts={Highcharts}
//             options={options}
//           />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Dash1;



// ............................................. 
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// export default function Dash1(props) {
//   const options = {
//     series: [ 
//       {
//         name: 'Total',
//         data: [19, 7, 9, 15, 5, 10]
//       },
//       {
//         name: 'Closed',
//         data: [14,6,8,15,5,9]
//       }
//     ],
//     chart: {
//       type: 'column'
//     },
//     title: {
//       text: ''
//     },
//     xAxis: {
//       categories: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR']
//     },
//     yAxis: {
//       title: {
//         text: ''
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="section1 row" style={{paddingTop: '71px'}}>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Total Projects</h4>
//             <p>8</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Closed</h4>
//             <p>2</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Running</h4>
//             <p>3</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Closure Delay</h4>
//             <p>2</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Cancelled</h4>
//             <p>3</p>
//           </div>
//         </div>
//       </div>
//       {/* section2 */}
//       <div className='card-header'>
//         Department wise - Total Vs Closed
//         <div>Chart Content Goes Here</div>
//         <div className='chart-card'>
//           <HighchartsReact
//             highcharts={Highcharts}
//             options={options}
//           />
//           </div>
//       </div>
//     </div>
//   );
// }
// ............................................. 


// import React from 'react';

// export default function Dash1(props) {
//   return (
//     <div>
//       <div className="section1 row">
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Total Projects</h4>
//             <p>8</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Closed</h4>
//             <p>2</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Running</h4>
//             <p>3</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Closure Delay</h4>
//             <p>2</p>
//           </div>
//         </div>
//         <div className="col-sm-2">
//           <div className="card">
//             <h4>Cancelled</h4>
//             <p>3</p>
//           </div>
//         </div>
//       </div>
//       <div className="section2 chart">
//         Department wise - Total Vs Closed
//         <div>Chart Content Goes Here</div>
//       </div>
//     </div>
//   );
// }




// import React from "react"


// export default function Dash1(props)
//  {
//     return (
//         <div>

//             <div className="row">
//                 <div className="col-sm-2">
//                     <div className="well">
//                         <h4>Users</h4>
//                         <p>1 Million</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-2">
//                     <div className="well">
//                         <h4>Pages</h4>
//                         <p>100 Million</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-2">
//                     <div class="well">
//                         <h4>Sessions</h4>
//                         <p>10 Million</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-2">
//                     <div className="well">
//                         <h4>Bounce</h4>
//                         <p>30%</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-2">
//                     <div className="well">
//                           fifth
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 second
//             </div>

//         </div>

//     );
//  }