
import React from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Image from './Dashboard-active.svg';  
import Image2 from './Project-list-active.svg';
import Image3 from './create-project-active.svg';
import Image4 from './Logout.svg';
import './Dashb.css';
import Logo from './Logo.svg';
import Dash1 from './Dash1';
import ProjectTable from '../project_list/ProjectTable';
import Tabled from '../project_list/TableDemo';
import CreatePr from './CreateProject';
import '../login/Login';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar.js';



function Dashb() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Navbar/> */}

      <img src={Logo} alt="Logo" className="logo" />
      <div className="tabs-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={1}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <img src={Image} alt="Tab 1" style={{ width: '20px', marginRight: '10px' }} />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <img src={Image2} alt="Tab 2" style={{ width: '20px', marginRight: '10px' }} />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <img src={Image3} alt="Tab 3" style={{ width: '20px', marginRight: '10px', paddingBottom: '0px' }} />
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link >
                    <img  style={{ width: '20px', marginRight: '10px', paddingBottom: '160px' }} />
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="fifth">
                    <img src={Image4} alt="Tab 4" style={{ width: '20px', marginRight: '10px' }} />
                   
                  </Nav.Link>
                </Nav.Item>
                
              </Nav>
            </Col>
            <Col sm={11}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Dash1 />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h4 className='table-head'>Project Listing</h4>
                  {/* section2 */}
                  <ProjectTable/>
  
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  {/* Third tab content */}
                  <h4 className='table-head'>Create Project</h4>
                  <CreatePr/>
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  Fourth tab content
                  {/* <Login/> */}                

                 
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Dashb;













// ......................................... run demo down 


// import React from 'react';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
// import Image from './Dashboard-active.svg';  // Adjust the path accordingly
// import Image2 from './Project-list-active.svg';
// import Image3 from './create-project-active.svg';
// import Image4 from './Logout.svg';
// import './Dashb.css';
// import Logo from './Logo.svg';
// import Dash1 from './Dash1';

// function Dashb() {
//   return (
//     <div>
//       <img src={Logo} alt="Logo" className="logo" />
//       <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//         <Row>
//           <Col sm={1}>
//             <Nav variant="pills" className="flex-column">
//               <Nav.Item>
//                 <Nav.Link eventKey="first">
//                   <img src={Image} alt="Tab 1" style={{ width: '20px', marginRight: '10px' }} />
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="second">
//                   <img src={Image2} alt="Tab 2" style={{ width: '20px', marginRight: '10px' }} />
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="third">
//                   <img src={Image3} alt="Tab 3" style={{ width: '20px', marginRight: '10px' }} />
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="fourth">
//                   <img src={Image4} alt="Tab 4" style={{ width: '20px', marginRight: '10px' }} />
//                 </Nav.Link>
//               </Nav.Item>
//             </Nav>
//           </Col>
//           <Col sm={11}>
//             <Tab.Content>
//               <Tab.Pane eventKey="first">
//                 <Dash1 />
//               </Tab.Pane>
//               <Tab.Pane eventKey="second">
//                 Second tab content
//               </Tab.Pane>
//               <Tab.Pane eventKey="third">
//                 Third tab content
//               </Tab.Pane>
//               <Tab.Pane eventKey="fourth">
//                 Fourth tab content
//               </Tab.Pane>
//             </Tab.Content>
//           </Col>
//         </Row>
//       </Tab.Container>
//     </div>
//   );
// }

// export default Dashb;




// import React from 'react';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
// import Image from './Dashboard-active.svg';  // Make sure to adjust the path accordingly
// import Image2 from './Project-list-active.svg';
// import Image3 from './create-project-active.svg';
// import Image4 from './Logout.svg';
// import './Dashb.css';
// import Logo from './Logo.svg';
// import Login from '../login/Login';
// import Dash1 from './Dash1';

// function Dashb() {
//   return (
//     <div>
//       <img src={Logo} alt="Logo" className="logo" />
//     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//       <Row>
//         <Col sm={1}>
//         {/* <Col> */}
//           <Nav variant="pills" className="flex-column">
//             <Nav.Item>
//               <Nav.Link eventKey="first">
//                 <img src={Image} alt="Tab 1" style={{ width: '20px', marginRight: '10px' }} />
//                 {/* Tab 1 */}
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="second">
//                 <img src={Image2} alt="Tab 2" style={{ width: '20px', marginRight: '10px' }} />
//                 {/* Tab 2 */}
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="third">
//                 <img src={Image3} alt="Tab 3" style={{ width: '20px', marginRight: '10px' }} />
//                 {/* Tab 3 */}
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="fourth">
//                 <img src={Image4} alt="Tab 4" style={{ width: '20px', marginRight: '10px' }} />
//                 {/* Tab 4 */}
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col sm={11}>
//           <Tab.Content>
//             <Tab.Pane eventKey="first"><Dash1/></Tab.Pane>
//             <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
//             <Tab.Pane eventKey="third">Third tab content</Tab.Pane>
//             <Tab.Pane eventKey="fourth">fourth tab content</Tab.Pane>
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//     </div>
//   );
// }

// export default Dashb;



// function Dashb() {
//   return (
//     <>
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               src={'Dashboard-active.svg'}
//               width="100"
//               height="100"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default Dashb;


// function Dashb() {
//   return (
//     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//       <Row>
//         <Col sm={3}>
//           <Nav variant="pills" className="flex-column">
//             <Nav.Item>
//               <Nav.Link eventKey="first">Tab 1</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="second">Tab 2</Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col sm={9}>
//           <Tab.Content>
//             <Tab.Pane eventKey="first">First tab content</Tab.Pane>
//             <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//   );
// }

// export default Dashb;