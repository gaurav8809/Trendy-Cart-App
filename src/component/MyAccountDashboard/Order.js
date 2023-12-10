import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux";
const Order = () => {
    let {order} = useSelector((state) => state.user);
    let productsData = useSelector((state) => state.products.products);

    let orderProducts = [];

    // order.map(o => {
    //     o?.products.filter(item=> {
    //         productsData.filter(item2 => {
    //             if(item.product_ID === item2.product_ID) {
    //                 orderProducts.push({...item, ...item2});
    //             }
    //         })
    //     });
    // });



    console.log('ORDER:', order)
    return (
        <>
            <div className="myaccount-content">
                <h4 className="title">Orders </h4>
                <div className="table_page table-responsive">
                    {
                        order?.length ?
                            <table>
                                <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.updated_at.split('T')[0].split('-')[1] + '-' +
                                            data.updated_at.split('T')[0].split('-')[2] + '-' +
                                            data.updated_at.split('T')[0].split('-')[0]}
                                        </td>
                                        <td><span className="badge badge-info">{data.status}</span></td>
                                        <td>${data.total} for {data.products.length} item </td>
                                        <td><Link to="/order-success" className="view">view</Link></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            :
                            'No order'
                    }

                </div>
            </div>
        </>
    )
}

export default Order
