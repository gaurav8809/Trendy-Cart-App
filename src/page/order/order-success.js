import React from 'react'
import OrderSuccess from '../../component/OrderSuccess'
const OrderSuccesses = (props) => {
    let { order_ID } = props.match.params;
    console.log('PARAM: ',order_ID)
    return (
        <>
            <OrderSuccess order_ID={order_ID}  />
        </>
    )
}

export default OrderSuccesses
