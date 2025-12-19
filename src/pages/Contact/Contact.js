import Navbar from '../../components/Navbar'
import '../../styles/Contact.css'

const Contact = () => {
  return (
    <div>
      <Navbar />
      
      <section className="contact-header">
        <div className="contact-header-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch!</p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="contact-info-content">
          <h2>Get in Touch</h2>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-emoji">📍</div>
              <h3>Address</h3>
              <p>123 Market Street<br/>City Center, State 12345</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-emoji">📞</div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-emoji">✉️</div>
              <h3>Email</h3>
              <p>info@minimart.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact