"use client";

export default function Payment() {
  const paymentPlans = [
    {
      gig: 10,
      price: 4.99,
    },
    {
      gig: 50,
      price: 9.99,
    },
    {
      gig: 100,
      price: 14.99,
    },
  ];
  return (
    <div className="w-full px-[30px] md:px-[60px] mb-[50px]">
      <h1 className="text-[30px] font-bold mb-[10px]">Upgrade Your Plan</h1>

      {/* Plans */}
      <div className="flex flex-col gap-4">
        {paymentPlans.map(({ gig, price }) => {
          return (
            <div
              key={gig}
              className="border rounded-lg w-full
            px-[10px] py-[15px]
            flex justify-between items-center"
            >
              <div>
                <p>{`${gig} GB`}</p>
                <p>{`$${price}/month`}</p>
              </div>
              <input type="radio" />
            </div>
          );
        })}
      </div>

      {/* Card Details */}

      <form action="" className="mt-[50px] flex flex-col gap-2">
        <div>
          <label htmlFor="name">Card Holder Name</label>
          <input type="text" className="formInput" />
        </div>

        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="number" className="formInput" />
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor="cvv">CVV</label>
            <input type="number" className="formInput" />
          </div>

          <div>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="number" className="formInput" />
          </div>
        </div>
      </form>
    </div>
  );
}
