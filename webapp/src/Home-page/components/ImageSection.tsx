
import pic from '../../assets/Images/pic.jpg'
const ImageSection = ()=>{
    return (
        <div>
               <div className="why-us section-padding bg-gray pos-re">
    <div className="container">
        <div className="row">            
            <div className="col-lg-6">
                <div className="img mb-md50">
                    <img src={pic} alt=""/>
                    <aside className='m-5 p-4 cont'>
                        <h5> samuel andrew</h5>
                        <p > founder concept Technologies</p>
                    </aside>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="content pt-10">
                    <div className="item mb-40">
                        <span className="icon icon-basic-display"></span>
                        <div className="cont">
                            <h5>Fully Responsive</h5>
                            <p>our designs are fully responsive, ensuring they look and function beautifully on any device, whether it's a desktop, tablet, or smartphone.</p>
                        </div>
                    </div>
                    <div className="item mb-40">
                        <span className="icon icon-basic-bolt"></span>
                        <div className="cont">
                            <h5>Clean & Modern Design</h5>
                            <p>We prioritize clean and modern design principles, creating visually appealing and user-friendly interfaces that enhance user experience.</p>
                        </div>
                    </div>
                    <div className="item">
                        <span className="icon ic,on-basic-headset"></span>
                        <div className="cont">
                            <h5>Proven Track Record</h5>
                            <p>With a portfolio of successful projects, we have a proven track record of delivering high-quality work that meets client expectations and drives results.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="curve curve-top"></div>
    <div className="curve curve-bottom"></div>
</div>
        </div>
    )
}

export default ImageSection