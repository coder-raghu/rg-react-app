import React from "react"
import { Container } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
    return(
        <>
        <Container>
            <Carousel>
                <div>
                    <img src="/slider/slider2.jpg" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="/slider/slider2.jpg" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="/slider/slider2.jpg" />
                    {/* <img src="/slider/bg.jpeg" /> */}
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>    
        </Container>
        </>
    )
}

export default Home;