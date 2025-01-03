// import { useState, useEffect } from 'react';
// import logo from '../../assets/Images/logo.jpg'
// import img4 from '../../assets/img/4.jpg';
// import img3 from '../../assets/img/3.jpg';
// import styles from './TabsSection.module.css';

// const TabsSection = () => {
//   const [activeTab, setActiveTab] = useState('tab1');
//   const [progressWidths, setProgressWidths] = useState({
//     design: 0,
//     branding: 0,
//     development: 0,
//   });

//   useEffect(() => {
//     if (activeTab === 'tab1') {
//       // Animating progress bar widths when "About Us" tab is active
//       setTimeout(() => {
//         setProgressWidths({
//           design: 90,
//           branding: 75,
//           development: 95,
//         });
//       }, 200); // Small delay to trigger animation
//     } else {
//       // Reset the progress bar widths when switching tabs
//       setProgressWidths({
//         design: 0,
//         branding: 0,
//         development: 0,
//       });
//     }
//   }, [activeTab]);

//   return (
//     <div className={styles['tabs-section']} id="about">
//       <div className="container">
//         <div className="row">
//           <ul className={`col-md-12 nav nav-pills ${styles.tabs}`} id="pills-tab" role="tablist">
//             <li className={`nav-item ${activeTab === 'tab1' ? 'active' : ''}`}>
//               <a
//                 className={`nav-link ${activeTab === 'tab1' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('tab1')}
//                 href="#tab1"
//               >
//                 About Us
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'tab2' ? 'active' : ''}`}>
//               <a
//                 className={`nav-link ${activeTab === 'tab2' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('tab2')}
//                 href="#tab2"
//               >
//                 Our Mission
//               </a>
//             </li>
//             <li className={`nav-item ${activeTab === 'tab3' ? 'active' : ''}`}>
//               <a
//                 className={`nav-link ${activeTab === 'tab3' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('tab3')}
//                 href="#tab3"
//               >
//                 Why Us?
//               </a>
//             </li>
//           </ul>

//           <div className={`tab-content col-lg-12 ${styles['tab-content']}`} id="pills-tabContent">
//             <div
//               className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`}
//               id="tab1"
//             >
//               <div className="row">
//                 <div className={`left col-lg-6 ${styles.about}`}>
//                   <div className="box-white content-box">
//                     <h5 className="title">About Us</h5>
//                     <h6 className="sub-title">Company Overview</h6>
//                     <p>
//                     Concept Technology and Software Solutions is a full-service technology firm specializing in custom software development, web design, IT consulting, and digital solutions. Established with a vision to empower businesses through innovative technology, we strive to bring imagination to reality by transforming ideas into functional, scalable, and efficient digital products.

// At Concept Technology, we believe that technology should serve as a bridge between your business and success. We collaborate closely with our clients to understand their needs, helping them visualize and bring their ideas to life. From the initial concept to the final product, we handle every step of the process with precision, creativity, and care.

// Our team of dedicated experts combines industry knowledge, technical expertise, and creativity to craft unique solutions that are tailored to your business. Whether you need a custom e-commerce platform, a sleek corporate website, or an entire IT infrastructure, our goal is to deliver solutions that not only meet but exceed expectations.
//                     </p>
//                     <div className={`skills mt-40 ${styles.skills}`}>
//                       <div className={`skill-item mb-30 ${styles['skill-item']}`}>
//                         <h6>Website Design</h6>
//                         <div className={`skill-progress ${styles['skill-progress']}`}>
//                           <div className={styles.progres} style={{ width: `${progressWidths.design}%` }}>
//                             <span className={styles['progress-text']}>{`${progressWidths.design}%`}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={`skill-item mb-30 ${styles['skill-item']}`}>
//                         <h6>Branding</h6>
//                         <div className={`skill-progress ${styles['skill-progress']}`}>
//                           <div className={styles.progres} style={{ width: `${progressWidths.branding}%` }}>
//                             <span className={styles['progress-text']}>{`${progressWidths.branding}%`}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className={styles['skill-item']}>
//                         <h6>Software Development</h6>
//                         <div className={`skill-progress ${styles['skill-progress']}`}>
//                           <div className={styles.progres} style={{ width: `${progressWidths.development}%` }}>
//                             <span className={styles['progress-text']}>{`${progressWidths.development}%`}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={`col-lg-6 ${styles.image}`}>
//                   <img src={logo} alt="About us" />

//                      <div className='p-4'>
//                         <p className='m-5'>At Concept Technology and Software Solutions, we don’t just develop software; we help you turn your ideas into reality. Whether you have a clear vision or need guidance on how to transform your business digitally, we are here to make it happen.</p>
//                         <a href="#0" className="butn butn-bg mt-4">
//                          <span>Get Started</span>
//                         </a>
//                   </div> 
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`}
//               id="tab2"
//             >
//               <div className="row">
//                 <div className={`left col-lg-6 ${styles.mission}`}>
//                   <div className="box-white content-box">
//                     <h5 className="title">Our Mission</h5>
//                    <p>Our mission is to deliver cutting-edge, tailor-made technology solutions that align with our clients' visions and business goals. We are committed to excellence, innovation, and customer satisfaction, providing high-quality software, web development, and IT consulting services that enable businesses to thrive in the digital age. Through collaboration, creativity, and technical expertise, we aim to transform concepts into powerful, functional solutions that drive success and sustainability.</p>
//                     <h5 className="title">Our Vision</h5>
//                     <p>
//                     To be a global leader in providing innovative technology solutions that empower businesses to turn their ideas into impactful digital realities, fostering growth and transformation in a rapidly evolving digital world.
//                     </p>
//                   </div>
//                 </div>
//                 <div className={`col-lg-6 ${styles.image}`}>
//                   <img src={img3} alt="Our mission" />


//                   {/* <div className='p-4'>
//                         <p className='m-5'>At Concept Technology and Software Solutions, we don’t just develop software; we help you turn your ideas into reality. Whether you have a clear vision or need guidance on how to transform your business digitally, we are here to make it happen.</p>
//                         <a href="#0" className="butn butn-bg mt-4">
//                          <span>Get Started</span>
//                         </a>
//                   </div> */}
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`tab-pane fade ${activeTab === 'tab3' ? 'show active' : ''}`}
//               id="tab3"
//             >
//               <div className="row">
//                 <div className={`left col-lg-6 ${styles['why-us']}`}>
//                   <div className="box-white content-box">
//                     <h5 className="title">Why Us?</h5>
//                     <ul className="feat">
//                       <li><i className="icon fas fa-lightbulb"></i> Tailored Solutions
//                       <p>We work closely with you to understand your needs and provide personalized solutions that match your vision.</p>
//                       </li>

//                       <li><i className="icon fas fa-headset"></i> Expert Team
//                       <p>Our team consists of experienced developers, designers, and IT professionals with a passion for technology and innovation.</p>
//                       </li>

//                       <li><i className="icon fas fa-users"></i> Client-Centric Approach
//                       <p> Your success is our priority. We value collaboration, communication, and transparency throughout every stage of development.</p>
//                       </li>

//                       <li><i className="icon fas fa-users"></i> Commitment to Excellence:
//                       <p>We are committed to delivering top-notch services, ensuring quality, functionality, and scalability in every project.</p>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className={`col-lg-6 ${styles.image}`}>
//                   <img src={img4} alt="Why us?" />
//                   <div className='p-4'>

//                   <p className='m-5'>At Concept Technology and Software Solutions, we don’t just develop software; we help you turn your ideas into reality. Whether you have a clear vision or need guidance on how to transform your business digitally, we are here to make it happen.</p>
//                   <a href="#0" className="butn butn-bg mt-4">
//                                 <span>Get Started</span>
//                             </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabsSection;
