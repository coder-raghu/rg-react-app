import { Offcanvas, Button } from "react-bootstrap";
import React, { useState } from "react"
import CookieConsent from "react-cookie-consent";

const Footer = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return(
        <>
            {/* <Container> */}
            <div className="mt-5 p-4 bg-dark text-white text-center">
                <p>Footer</p>
            </div>
            <CookieConsent
                location="bottom"
                buttonText="Accept all cookies"
                cookieName="shopieacceptcookieman"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                enableDeclineButton
                >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
            </CookieConsent>
            {/* </Container> */}
        </>
    )
}

export default Footer;