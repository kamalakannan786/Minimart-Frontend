import Navbar from '../../components/Navbar'
import '../../styles/About.css'

const About = () => {
  return (
    <div>
      <Navbar />
      
      <section className="about-header">
        <h1>About MiniMart</h1>
        <p>Your trusted grocery store</p>
      </section>

      <section className="vision-section">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            To be the leading grocery store that transforms the way people shop for daily essentials by providing 
            fresh, quality products with exceptional customer service.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To provide our community with the freshest products, best prices, and fastest delivery while 
            maintaining the highest standards of quality and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="values-content">
          <h2>Our Values</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-emoji">🌱</div>
              <h3>Fresh Quality</h3>
              <p>Daily fresh produce from local farms</p>
            </div>
            
            <div className="value-card">
              <div className="value-emoji">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with great offers</p>
            </div>
            
            <div className="value-card">
              <div className="value-emoji">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About