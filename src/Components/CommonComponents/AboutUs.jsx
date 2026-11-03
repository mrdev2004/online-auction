import React from 'react';

const AboutUs = () => {
  return (
    <div className="container-fluid bg-light py-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      <link rel="stylesheet" href="css/linearicons.css" />
      <link rel="stylesheet" href="css/owl.carousel.css" />
      <link rel="stylesheet" href="css/themify-icons.css" />
      <link rel="stylesheet" href="css/font-awesome.min.css" />
      <link rel="stylesheet" href="css/nice-select.css" />
      <link rel="stylesheet" href="css/nouislider.min.css" />
      <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet" href="css/main.css" />

      {/* Banner Section */}
      <section className="banner-area organic-breadcrumb">
        <div className="container">
          <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
            <div className="col-first">
              <h1 className="display-3 text-dark font-weight-bold">About Us</h1>
              <nav className="d-flex align-items-center">
                <a href="/" className="text-dark">Home</a>
                <span className="lnr lnr-arrow-right mx-2 text-dark" />
                <a href="/Contact" className="text-dark">About Us</a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4 text-primary font-weight-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Welcome to <span className="text-warning">BidRise</span>
          </h1>
          <p className="lead mb-5 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            BidRise is your trusted destination for online auctions. We bring together passionate collectors, buyers, and sellers in a dynamic and exciting platform for bidding on unique items across a wide range of categories.
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="row mb-5 px-4">
        <div className="col-md-6">
          <h3 className="font-weight-bold text-dark mb-3" style={{ color: '#2d2d2d' }}>Our Mission</h3>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            At <span className="font-weight-bold text-primary">BidRise</span>, our mission is to provide an easy-to-use, secure, and transparent platform where users can buy and sell items through exciting auctions. We aim to create a marketplace that everyone can enjoy—from seasoned collectors to first-time bidders.
          </p>
        </div>

        <div className="col-md-6">
          <h3 className="font-weight-bold text-dark mb-3" style={{ color: '#2d2d2d' }}>Our Vision</h3>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Our vision is to revolutionize the online auction experience by building a community of enthusiastic buyers and sellers who can engage with valuable items. We aim to offer an outstanding customer experience, making transactions seamless and secure for everyone.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row mb-5 px-4">
        <div className="col-md-6">
          <h3 className="font-weight-bold text-dark mb-3" style={{ color: '#2d2d2d' }}>Why Choose Us?</h3>
          <ul className="list-unstyled" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            <li className="mb-3">
              <i className="fas fa-check-circle mr-3 text-primary" style={{ fontSize: '1.2rem' }}></i>
              Secure Bidding Environment
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle mr-3 text-primary" style={{ fontSize: '1.2rem' }}></i>
              Wide Range of Categories
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle mr-3 text-primary" style={{ fontSize: '1.2rem' }}></i>
              Transparent and Fair Transactions
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle mr-3 text-primary" style={{ fontSize: '1.2rem' }}></i>
              Customer Support Available 24/7
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h3 className="font-weight-bold text-dark mb-3" style={{ color: '#2d2d2d' }}>Terms and Conditions</h3>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            1. User Eligibility:
            Users must be at least 18 years old or of legal age in their jurisdiction.

            2. Account Registration:
            Users must provide accurate information and maintain account confidentiality.

            3. Auctioneer Responsibilities:
            Auctioneers must list items truthfully and comply with all legal requirements.

            4. Bidder Responsibilities:
            Bidders must honor their winning bids and ensure sufficient funds are available.

            5. Bidding Process:
            All bids are final. The platform is not responsible for technical issues affecting bids.

            6. Payment Terms:
            Winners must complete payment within the specified timeframe.

            7. Item Delivery:
            Auctioneers are responsible for item delivery as agreed with the winning bidder.

            8. Prohibited Items:
            Illegal or counterfeit items are strictly prohibited.

            9. Dispute Resolution:
            The platform will mediate disputes, with its decision being final.

            10. Platform Liability:
            The platform is not liable for losses or disputes arising from auction participation.

            11. Privacy Policy:
            User data is handled per our privacy policy.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row mt-5 px-4">
        <div className="col text-center">
          <a href="/contact" className="btn btn-lg btn-warning text-white font-weight-bold" style={{ fontSize: '1.2rem', padding: '12px 30px' }}>
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
