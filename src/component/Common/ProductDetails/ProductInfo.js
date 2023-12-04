import React from 'react'
// import Img
import user1 from '../../../assets/img/user/user1.png'
import user2 from '../../../assets/img/user/user2.png'
import user3 from '../../../assets/img/user/user3.png'
import {Col, Container, Row} from "react-bootstrap";
import _ from 'lodash';

const ReviewData = [
    {
        img: user1,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user2,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user3,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },

]

const ProductInfo = (props) => {

    const {
        description,
        rating,
        info
    } = props.product;

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="product_details_tabs">
                        <ul className="nav nav-tabs">
                            {/*<li><a data-toggle="tab" href="#description" className="active">Description</a></li>*/}
                            <li><a className="active" data-toggle="tab" href="#additional">Additional Information</a></li>
                            <li><a data-toggle="tab" href="#review">Review</a></li>
                        </ul>
                        <div className="tab-content">
                            {/*<div id="description" className="tab-pane fade in show active">*/}
                            {/*    <div className="product_description">*/}
                            {/*        <p>{description}</p>*/}
                            {/*        <ul>*/}
                            {/*            <li>Vivamus magna justo, lacinia eget consectetur sed</li>*/}
                            {/*            <li>Curabitur aliquet quam id dui posuere blandit</li>*/}
                            {/*            <li>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar </li>*/}
                            {/*        </ul>*/}
                            {/*        <p>Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum*/}
                            {/*            porta.*/}
                            {/*            Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.*/}
                            {/*            Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum*/}
                            {/*            porta. Curabitur arcu erat, accumsan id imperdiet et,*/}
                            {/*            Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet,*/}
                            {/*            consectetur adipiscing elit.*/}
                            {/*            porttitor at sem. Quisque velit nisi, pretium ut lacinia in, elementum id enim.*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div id="additional" className="tab-pane fade in show active">
                                <div className="product_additional">
                                    <Container>
                                        <Row>
                                            {
                                                _.map(info, (value, key) => {
                                                    return(
                                                        <Col sm={4}>
                                                            <ul>
                                                                <li>
                                                                    {key === 'd' ? 'Details' : key === 'ci' ? 'Care Instruction' : 'Materials'}
                                                                    {value.map((item) => {
                                                                        return(
                                                                            <span>{`\u2022 ${item}`}</span>
                                                                        );
                                                                    })}
                                                                </li>
                                                            </ul>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                            <div id="review" className="tab-pane fade">
                                <div className="product_reviews">
                                    <ul>
                                        {ReviewData.map((data, index) => (
                                            <li className="media" key={index}>
                                                <div className="media-img">
                                                    <img src={data.img} alt="img" />
                                                </div>
                                                <div className="media-body">
                                                    <div className="media-header">
                                                        <div className="media-name">
                                                            <h4>{data.name}</h4>
                                                            <p>{data.date}</p>
                                                        </div>
                                                        <div className="post-share">
                                                            <a href="#!" className="replay">{data.replay}</a>
                                                            <a href="#!" className="">{data.report}</a>
                                                        </div>
                                                    </div>
                                                    <div className="media-pragraph">
                                                        <div className="product_review_strat">
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                        </div>
                                                        <p>{data.para}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
