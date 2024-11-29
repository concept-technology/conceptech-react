
import pic from '../../assets/img/blog/1.jpg'
const BlogSection = ()=>{
    return(
      
        <section className="blog section-padding" data-scroll-index="5">
            <div className="container">
                <div className="row">
                    
                    <div className="section-head offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                        <h4><span>Latest</span> News</h4>
                        <p>At Concept Technology and Software Solutions, we believe in staying ahead of the curve when it comes to technology, innovation, and business solutions. Our blog is designed to provide valuable insights, tips, and updates for businesses, developers, and tech enthusiasts looking to harness the power of the digital world.</p>
                    </div>


                    <div className="col-lg-4">
                        <div className="item mb-md50">
                            <div className="post-img">
                                <div className="img">
                                    <img src={pic} alt=""/>
                                </div>
                            </div>
                            <div className="cont">
                                <div className="info">
                                    <a href="#0">By : Admin</a>
                                    <a href="#0">06 Aug 2017</a>
                                    <a href="#0" className="tag">WordPress</a>
                                </div>
                                <h6><a href="#0">48 Best WordPress Themes</a></h6>
                                <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the dummy text ever</p>
                                <a href="#0" className="more">Read More <i className="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

  
                </div>
            </div>
        </section>        

    )
}

export default BlogSection