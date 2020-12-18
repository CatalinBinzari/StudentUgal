import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout'

class Paypal extends Component {
    state = {  }

    // {"paid":true,
    // "cancelled":false,
    // "payerID":"BP7VDQUB938UN",
    // "paymentID":"PAYID-L42EWKQ81N55705UL981112W"
    // ,"paymentToken":"EC-8WW852593G6294020"
    // ,"returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L42EWKQ81N55705UL981112W&token=EC-8WW852593G6294020&PayerID=BP7VDQUB938UN",
    // "address":{
    //     "recipient_name":"John Doe",
    //     "line1":"1 Main St",
    //     "city":"San Jose",
    //     "state":"CA",
    //     "postal_code":"95131",
    //     "country_code":"US"
    //          },
    // "email":"sb-ybql52810118@personal.example.com"}
    render() { 

        const onSuccess = (payment) =>{
            //console.log(JSON.stringify(payment));
            this.props.onSuccess(payment)
        }
        const onCancel = (data) =>{
            console.log(JSON.stringify(data));

        }
        const onError = (err) =>{
            console.log(JSON.stringify(err));

        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay

        const client ={
            sandbox:'AQIuR2gXZJ_XjJl2tBBzE-5VUnDLy6zOUFLrbtQIb1vgmbkxW52kikCgpstrYcYUGixmBWXjjbF4w79A',
            production:''
        }

        return ( 
            <div>
                <PaypalExpressBtn 
                env={env}
                client={client}
                currency={currency}
                total={total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                style={{
                    size:'large',
                    color:'blue',
                    shape:'rect',
                    label:'checkout'
                }}
                />
            </div>
         );
    }
}
 
export default Paypal;