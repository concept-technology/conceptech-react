import React from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";
import logo from "../assets/mylogo.png"
interface PaymentProps {
  amount: number;
  email: string;
  username: string;
  phone: string;
  transactionId: string;
  onSuccess: (transactionId: string) => void;
}

const FlutterwavePayment: React.FC<PaymentProps> = ({ amount, email, username, phone, transactionId, onSuccess }) => {
  const config = {
    public_key: "your_flutterwave_public_key",
    tx_ref: transactionId,
    amount: amount,
    currency: "USD",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      phonenumber: phone, // ✅ Fixed missing field
      name: username,
    },
    customizations: {
      title: "My Store",
      description: "Payment for Order",
      logo:logo, // ✅ Fixed missing field
    },
    callback: (response: any) => {
      if (response.status === "successful") {
        onSuccess(response.transaction_id);
      }
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <FlutterWaveButton {...config} className="btn btn-primary">
      Pay Now {amount}
    </FlutterWaveButton>
  );
};

export default FlutterwavePayment;
