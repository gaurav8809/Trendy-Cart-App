import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const Map = () => {
    const mapStyles = {
        height: "50vh",
        width: "100%",
        margin: "0 0 0 0"
    };
    const defaultCenter = {
        lat: 22.8136822, lng: 89.5635596
    }
    return (
        <>
            <div className="col-lg-12">
                <div className="map_area">
                    <LoadScript>
                        {/*<GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}></GoogleMap>*/}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.772482993508!2d-83.25561251215854!3d42.475127353532045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c829724c7e31%3A0x2573d707405921d7!2sLawrence%20Technological%20University!5e0!3m2!1sen!2sus!4v1702514949559!5m2!1sen!2sus" frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </LoadScript>
                </div>
            </div>
        </>
    )
}
export default Map
