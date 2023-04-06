import { useEffect, useState } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function BookCar() {
  return (
    <>
      <div className="flex relative z-30 flex-col items-center justify-center h-96 w-[100%] bg-violet-500 text-white text-2xl">
        paypal account
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          <PayPalButtons />
        </PayPalScriptProvider>
      </div>
    </>
  );
}

export default BookCar;
