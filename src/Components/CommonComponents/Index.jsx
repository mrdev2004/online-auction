import React, { useEffect, useState, useRef } from 'react';

import { ChevronLeft, ChevronRight, Truck, RefreshCw, Headphones, ShieldCheck, Clock } from 'lucide-react';
import Style from './Style';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const Index = () => {
    const [auctions, setAuctions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
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

        // Auto-advance carousel
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % (auctions.length || 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [auctions.length]);

    const checkforlogin = () => {
        if (checkuser?.length > 1) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    // Styles
    const sectionStyle = {
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '40px 20px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    };

    const categoryCardStyle = {
        ...cardStyle,
        position: 'relative',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    };

    const sectionTitleStyle = {
        fontSize: '32px',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333',
        position: 'relative'
    };

    const dividerStyle = {
        width: '60px',
        height: '4px',
        background: '#4CAF50',
        margin: '16px auto 0',
        borderRadius: '2px'
    };


    const canvasRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, and Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 50);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputEncoding = THREE.sRGBEncoding;

        // Load Environment Map
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(
            'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/klippad_dawn_2_2k.hdr',
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
            },
            undefined,
            (error) => console.error('Error loading HDRI:', error)
        );

        // Load 3D Model
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('./jordan.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, -3, 0);
            scene.add(model);
        });

        // Add Lighting
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            scene.traverse((child) => {
                if (child.isMesh) {

                    // child.rotation.y += 0.05;
                    child.rotation.z += 0.01;
                }
            });
            renderer.render(scene, camera);
        };
        animate();

        // Handle Resizing
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Style />
            {/* Three.js Canvas */}
            <canvas ref={canvasRef} />
            {/* Alert Component */}
            {showAlert && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000
                }}>

                </div>
            )}

            {/* Hero Carousel */}
            <div style={{
                position: 'relative',
                height: '500px', // Adjusted height
                overflow: 'hidden',
                backgroundColor: '#f8f9fa',
                marginBottom: '40px',
                borderRadius: '10px', // Added rounded edges for better aesthetics
                maxWidth: "1200px", // Set a max width
                margin: "auto",
                marginTop: "6.4%",
                // marginTop: "100px", // Center the carousel
            }}>
                <div style={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * 100}%)`
                }}>
                    {auctions.slice(5).map((auction, index) => (
                        <div key={index} style={{ minWidth: '100%', height: '500px', position: 'relative' }}>
                            <img
                                src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                                    auction.image_path.replace("uploads/", "")
                                )}`}
                                alt={auction.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover", // Ensures the image covers the space without stretching
                                    borderRadius: "10px"
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                background: 'rgba(0,0,0,0.5)',
                                padding: '15px',
                                borderRadius: '8px'
                            }}>
                                <h2 style={{ fontSize: '32px', marginBottom: '8px', color: "white" }}>{auction.title}</h2>
                                <p style={{ fontSize: '18px' }}>Starting at Rs.{auction.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Controls */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + auctions.length) % auctions.length)}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2
                    }}
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % auctions.length)}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2
                    }}
                >
                    <ChevronRight />
                </button>
            </div>


            {/* Features Section */}
            <div style={sectionStyle}>
                <h1 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "sans-serif", fontSize: "26px", fontWeight: "600" }}>Webiste Key Points</h1>
                <div style={gridStyle}>
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Truck size={32} color="#4CAF50" />
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>Free Delivery</h3>
                            <p style={{ margin: 0, color: '#666' }}>On all orders over $50</p>
                        </div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <RefreshCw size={32} color="#2196F3" />
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>Easy Returns</h3>
                            <p style={{ margin: 0, color: '#666' }}>30-day return policy</p>
                        </div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Headphones size={32} color="#FF9800" />
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>24/7 Support</h3>
                            <p style={{ margin: 0, color: '#666' }}>Always here to help</p>
                        </div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <ShieldCheck size={32} color="#9C27B0" />
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>Secure Payments</h3>
                            <p style={{ margin: 0, color: '#666' }}>100% secure checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Auctions */}
            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    Featured Auctions
                    <div style={dividerStyle}></div>
                </h2>
                <div style={gridStyle}>
                    {auctions.slice(0, 6).map((auction) => (
                        <div key={auction.id} style={cardStyle}>
                            <div style={{ position: 'relative', paddingTop: '75%' }}>
                                <img
                                    src={`http://localhost/demo/serve_image.php?file=${encodeURIComponent(
                                        auction.image_path.replace("uploads/", "")
                                    )}`}
                                    alt={auction.title}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#4CAF50',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    Featured
                                </div>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{auction.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                                        Rs.{auction.price}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Categories */}
            {/* <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    Popular Categories
                    <div style={dividerStyle}></div>
                </h2>
                <div style={gridStyle}>
                    {['Electronics', 'Fashion', 'Home & Garden', 'Collectibles'].map((category, index) => (
                        <div key={index} style={categoryCardStyle}>
                            <img
                                src={`/api/placeholder/400/320`}
                                alt={category}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                background: 'rgba(0,0,0,0.5)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{category}</h3>
                                <p>Browse Category</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )
}
export default Index

