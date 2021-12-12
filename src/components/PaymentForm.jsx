import React, {useState, useContext} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../apis';
import AuthContext from '../contexts/AuthContext';

import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

import { Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const PaymentForm = ({ amount, items, onDone }) => {
    const  [loading, setLoading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const auth = useContext(AuthContext);
    const params = useParams();


    const onSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error){
            setLoading(true);
            const json = await createPaymentIntent({
                "payment_method": paymentMethod,
                "amount": amount,
                "place": params.id,
                "table": params.table,
                "detail": items
            }, auth.token)

            if(json?.success){
                toast(`Your order #${json.order} is processing`, {type: 'success'})
                onDone();
                setLoading(false);
            }else if(json?.error){
                toast(json.error, {type: 'error'})
                setLoading(false);

            }

            setLoading(false);

        }


    }

    return (
        <Form onSubmit={onSubmit}>
            <CardElement options={{ hidePostalCode: true }}/>

            <div className="d-grid gap-2 mt-4">
            <Button variant="success" size="lg" className="mt-4" block type='submit' disabled={loading}>
                {loading ? "Processing" : "Pay"}
            </Button>
            </div>
        </Form>
    );
};

const stripePromise = loadStripe("pk_test_ZftudnwgLptHpItG65zdh7IO");


const StripeContext = (props) => (
    <Elements stripe={stripePromise}>
        <PaymentForm {...props} />
    </Elements>
);

export default StripeContext;