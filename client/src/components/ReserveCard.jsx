const ReserveCard = ({ price }) => {
  return (
    <div className="border shadow-md p-4 rounded-2xl mt-6 grid sticky">
      <h2 className="text-2xl tracking-tighter text-center">
        ${price} USD
        <span className="text-sm tracking-normal"> night</span>
      </h2>
      <div>
        <label>Check-in</label>
        <input type="date" />
      </div>
      <div>
        <label>Checkout</label>
        <input type="date" />
      </div>
      <div>
        <label>Number of guests</label>
        <input type="number" min={1} />
      </div>
      <div className="flex justify-between">
        <p>Cleaning fee</p>
        <span>$15 USD</span>
      </div>
      <div className="flex justify-between">
        <p>Waterbnd service fee</p>
        <span>$45 USD</span>
      </div>
      <div className="flex justify-between pt-3 mt-2 border-t border-black font-semibold">
        <p>Total</p>
        <span>${price + 15 + 45} USD</span>
      </div>
      <button className="primary">Reserve</button>
    </div>
  );
};

export default ReserveCard;
