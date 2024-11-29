import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [captchaValidated, setCaptchaValidated] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!captchaValidated) {
      alert("Please complete the CAPTCHA");
      return;
    }

    try {
      const response = await axios.post('YOUR_ENDPOINT_URL', {
        ...data,
        captcha: recaptchaRef.current?.getValue(),
      });
      console.log(response.data);
      // Handle success (e.g., show a success message)
      reset(); // Reset the form after successful submission
      recaptchaRef.current?.reset();
      setCaptchaValidated(false);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValidated(!!value);
  };

  return (
    <section className="contact section-padding" data-scroll-index="6" id="contact">
      <div className="container">
        <div className="row">
          <div className="section-head offset-md-2 col-md-8 offset-lg-3 col-lg-6">
            <h4>Con<span>tact</span> us</h4>
            <p>We're always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question, a project proposal, or just want to say hello, feel free to reach out!</p>
          </div>
          <div className="col-lg-5">
            <div className="contact-info mb-md50">
              <h5>Contact Me :</h5>
              <p>Please fill out the form below, and I'll get back to you as soon as possible.</p>
              <div className="item">
                <span className="icon icon-basic-tablet"></span>
                <div className="cont">
                  <h6>Phone : </h6>
                  <p>+234 814 300 6319</p>
                </div>
              </div>
              <div className="item">
                <span className="icon icon-basic-mail-open-text"></span>
                <div className="cont">
                  <h6>Email : </h6>
                  <p>samuelandrew145@gmail.com</p>
                </div>
              </div>
              <div className="item">
                <span className="icon icon-basic-geolocalize-05"></span>
                <div className="cont">
                  <h6>Address : </h6>
                  <p>No. 160, Samuel Ladoke Akintola Boulevard, Garki 2, Abuja</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form className="form" id="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="messages"></div>
              <div className="controls">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        id="form_name"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        placeholder="Name"
                      />
                      {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        id="form_email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Email"
                      />
                      {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        id="form_subject"
                        type="text"
                        {...register("subject", { required: "Subject is required" })}
                        placeholder="Subject"
                      />
                      {errors.subject && <span className="error">{errors.subject.message}</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        {...register("message", { required: "Message is required" })}
                        placeholder="Message"
                      />
                      {errors.message && <span className="error">{errors.message.message}</span>}
                    </div>
                  </div>

                  <div className="col-md-12">

                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey='6LfsolYqAAAAAFQHMfwc8y6-ErwehLSMnA2luE1e'
                        onChange={handleCaptchaChange}
                      />
          
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary m-3" disabled={!captchaValidated}>
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
