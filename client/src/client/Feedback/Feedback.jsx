import React, { useEffect, useState } from 'react';
import "./feedbackstyle.scss";
import MetaData from '../MetaData/MetaData';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail} from 'react-icons/md';
import Imgs from "../images/about1.jpg";

const Feedback = () => {

	const [userData, setUserData] = useState({ name: "", email: "", subject: "", message: "" });


	const userFeedback = async () => {

		try {
		  const res = await fetch('/getdata', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			},
		  });
		  const data = await res.json();
		  console.log(data);
		  setUserData({ ...userData, name: data.name, email: data.email });
		  // console.log(`data send to backend`);
	
		  if (!res.status === 200) {
			const error = new Error(res.error);
			throw error;
	
		  }
	
	
		} catch (err) {
		  console.log(err);
		}
	
	  }
	  /*  USEEFFECT HOOK -> RUN ONLY ONE TIME WHEN FUNCTION IS CALLED -> ARRAY DENOTES -> NO OF TYMS USEEFFECT CALLLS -> callProfilePage is async function -> so we can not use it inside useEffect */
	 
	  useEffect(() => {
	
		userFeedback();
	  }, []);
	
	


// for storing data in states
const handleInputs = (e) => {
    const name = e.target.name;
    const value =  e.target.value;

    setUserData({ ...userData, [name]: value });

  }




  // SEND DATA TO BACKEND

  const feedbackForm = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = userData;
    const res = await fetch('/feedback', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, subject, message
      })
    });

    const data = await res.json();

    if (!data) {
      console.log(`message not send `);
    } else {
      alert("Message Sent");
      setUserData({...userData , message: "" , subject: ""});
    }


  }



  return (
      <>
      <MetaData title="Feedback"></MetaData>
      <div className="container-fluid nav_bg feedbackcls">
        <div className='row'>
          <div className='col-10 mx-auto'>

          



          <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
            <div className="section-title">
                  <h2 font-color="#00bcd4" data-aos="fade-up" data-aos-delay="300">Feedback</h2>
                  <p data-aos="fade-up" data-aos-delay="400">  What are your main concerns or questions about our Website?</p>
                </div>

			</div>
			<div className="row justify-content-center">
				<div className="col-md-12">
					<div className="wrapper">
						<div className="row mb-5" data-aos="fade-up" data-aos-delay="300">
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-map-marker"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Address:</span> Nadiad</p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-phone"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Phone:</span> <a href="tel://8980452333" >8980452333</a></p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-paper-plane"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Email:</span> <a href="mailto:itznihal143@gmail.com">itznihal143@gmail.com</a></p>
				          </div>
			          </div>
							</div>
							<div className="col-md-3">
								<div className="dbox w-100 text-center">
			        		<div className="icon d-flex align-items-center justify-content-center">
			        			<span className="fa fa-globe"></span>
			        		</div>
			        		<div className="text">
				            <p><span>Website</span> <a href="#">abc.com</a></p>
				          </div>
			          </div>
							</div>
						</div>
						

{/* From Section */}

<div className="col-lg-10 mt-5 mt-lg-0  d-flex align-items-center justify-content-center contact" data-aos="fade-up" data-aos-delay="300">
            <form  method="POST" role="form" className="react-email-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="name">Your Name</label>
                  <input type="text" name="name"
				    value={userData.name}
                            onChange={handleInputs}
							 className="form-control" id="name" required/>
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Your Email</label>
                  <input type="email" className="form-control" name="email"
				  value={userData.email}
                            onChange={handleInputs}
							 id="email" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="name">Subject</label>
                <input type="text" className="form-control" name="subject"
				 value={userData.subject}
                            onChange={handleInputs}
							 id="subject" required/>
              </div>
              <div className="form-group">
                <label for="name">Message</label>
                <textarea className="form-control" name="message"
				 value={userData.message}
                            onChange={handleInputs}
							 rows="10" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit" onClick={feedbackForm}>Send Message</button></div>
            </form>
          </div>





{/* SECTION END */}

					</div>
				</div>
			</div>
		</div>
	</section>




          </div>
          </div>
          </div>
   </>
  )
}

export default Feedback