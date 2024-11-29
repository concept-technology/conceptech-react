import TabsSection from "./About"

const About_us = ()=>{
    return(
        <div>
            {/* about our us session */}
    <section className="hero" data-scroll-index="1">
            <div className="section-padding pos-re">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 text-center mb-80">
                            <h4 className="extra-title">Our<span>Services</span></h4>
                            <p>At Concept Technologies and Software Solutions, we specialize in providing custom-built software and technology solutions that drive innovation, efficiency, and growth for businesses of all sizes. Whether you're looking to develop software from scratch, revamp an existing system, or migrate to the cloud, we offer tailor-made solutions that align perfectly with your business goals. Our expert team ensures that every solution we provide is scalable, reliable, and tailored to your unique needs.</p>
                        </div>

                        <div className="feat-item mb-md50 col-lg-4">
                            <div className="text-center">
                                <span className="icon icon-basic-anchor"></span>
                                <h5>Web Design</h5>
                                <h6>Modern & Clean Design</h6>
                                <p>Craft responsive and dynamic websites that offer an excellent user experience and align with your business goals.</p>
                       
                            </div>
                        </div>

                        <div className="feat-item active mb-md50 col-lg-4">
                            <div className="text-center">
                                <span className="icon icon-basic-pencil-ruler"></span>
                                <h5>Custom Software Development</h5>
                                <h6>web and Mobile application</h6>
                                <p>Build tailor-made software solutions designed to meet your specific business needs.
                                </p>                        
                            </div>
                        </div>

                        <div className="feat-item col-lg-4">
                            <div className="text-center">
                                <span className="icon icon-basic-cards-diamonds"></span>
                                <h5>Branding</h5>
                                <h6>Logo & Motion Design</h6>
                                <p></p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="curve curve-gray-b curve-bottom"></div>
            </div>

            <div className="tabs-section section-padding bg-gray" id='about'>
                <div className="container">
                    <div className="row">
                        <ul className="col-md-12 nav nav-pills tabs">
                 
                        </ul>
                        
                      <TabsSection/>
                    </div>
                </div>
            </div>
        </section>


        </div>
    )
}

export default About_us