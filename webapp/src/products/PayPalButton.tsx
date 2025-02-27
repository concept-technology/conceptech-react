import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  amount: number;
  currency: string;
  onSuccess: (details: any) => void;
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutProps> = ({ amount, currency, onSuccess }) => {
  return (
    
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
                currency_code: currency
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        if (!actions.order) {
          return Promise.reject(new Error("Order not available"));
        }
        return actions.order.capture().then(onSuccess);
      }}
    />
  );
};

export default PayPalCheckoutButton;
