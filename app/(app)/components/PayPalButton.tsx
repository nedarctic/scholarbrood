"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalButton({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: (paypalOrderId: string) => void;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX!,
        intent: "capture",
      }}
    >
      <PayPalButtons
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
          });
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });

          const result = await res.json();

          if (!res.ok || !result?.paypalOrderId) {
            throw new Error("PayPal capture failed");
          }

          onSuccess(result.paypalOrderId);
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
