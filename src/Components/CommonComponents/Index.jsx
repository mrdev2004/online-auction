import React, { useEffect, useState } from 'react'
import Style from "./Style"
import { toast } from 'react-toastify';
const Index = () => {
    const [auctions, setAuctions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const checkuser = localStorage.getItem("user1");
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await fetch("http://localhost/demo/getshopdata.php");
                const data = await response.json();

                if (response.ok) {
                    setAuctions(data.data);
                } else {
                    setError(data.error || "Error loading data.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);
    const checkforlogin = () => {
        if (checkuser.length > 1) {
            toast.error("please login first to access shop page")
        }

    }
    return (
        <>
            <Style />
            <section className="category-area">
                <div className="container">
                    <div className="row justify-content-center" style={{ paddingTop: "150px" }}>
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img
                                            className="img-fluid w-100"
                                            src="img/category/c1.jpg"
                                            alt=""
                                        />

                                        <a
                                            onClick={checkforlogin}
                                            href="img/category/c1.jpg"
                                            className="img-pop-up"


                                        >
                                            <div className="deal-details">
                                                <h6 className="deal-title accent-inherit-50" >Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img
                                            className="img-fluid w-100"
                                            src="img/category/c2.jpg"
                                            alt=""
                                        />
                                        <a
                                            href="img/category/c2.jpg"
                                            className="img-pop-up"
                                            target="_blank"
                                        >
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img
                                            className="img-fluid w-100"
                                            src="img/category/c3.jpg"
                                            alt=""
                                        />
                                        <a
                                            href="img/category/c3.jpg"
                                            className="img-pop-up"
                                            target="_blank"
                                        >
                                            <div className="deal-details">
                                                <h6 className="deal-title">Product for Couple</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8">
                                    <div className="single-deal">
                                        <div className="overlay" />
                                        <img
                                            className="img-fluid w-100"
                                            src="img/category/c4.jpg"
                                            alt=""
                                        />
                                        <a
                                            href="img/category/c4.jpg"
                                            className="img-pop-up"
                                            target="_blank"
                                        >
                                            <div className="deal-details">
                                                <h6 className="deal-title">Sneaker for Sports</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-deal">
                                <div className="overlay" />
                                <img className="img-fluid w-100" src="img/category/c5.jpg" alt="" />
                                <a
                                    href="img/category/c5.jpg"
                                    className="img-pop-up"
                                    target="_blank"
                                >
                                    <div className="deal-details">
                                        <h6 className="deal-title">Sneaker for Sports</h6>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="features-area section_gap">
                <div className="container">

                    <div className="row features-inner">
                        {/* single features */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src="img/features/f-icon1.png" alt="" />
                                </div>
                                <h6>Free Delivery</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>
                        {/* single features */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src="img/features/f-icon2.png" alt="" />
                                </div>
                                <h6>Return Policy</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>
                        {/* single features */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src="img/features/f-icon3.png" alt="" />
                                </div>
                                <h6>24/7 Support</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>
                        {/* single features */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-features">
                                <div className="f-icon">
                                    <img src="img/features/f-icon4.png" alt="" />
                                </div>
                                <h6>Secure Payment</h6>
                                <p>Free Shipping on all order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end features Area */}
            {/* Start category Area */}


            <section className="related-product-area section_gap_bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <div className="section-title">
                                <h1>Deals of the Week</h1>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12" >
                            <div className="row" style={{ display: "flex" }}>
                                {auctions.slice(6).map((auction) => (
                                    <div key={auction.id} className="col-lg-4 col-md-4 col-sm-6 mb-20" >
                                        <div className="single-related-product d-flex">
                                            <a href="#">
                                                <img
                                                    src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                                                        auction.image_path.replace("uploads/", "")
                                                    )}`}
                                                    alt={auction.title}
                                                    style={{ height: "100px", "width": "100px" }}
                                                />
                                            </a>
                                            <div className="desc">
                                                <a href="#" className="title">
                                                    {auction.title}
                                                </a>
                                                <div className="price">
                                                    <h6>Rs.{auction.price}</h6>
                                                    {auction.original_price && (
                                                        <h6 className="l-through">Rs.{auction.original_price}</h6>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </section>

        </>

    )
}

export default Index