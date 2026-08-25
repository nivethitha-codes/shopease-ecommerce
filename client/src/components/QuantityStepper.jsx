const QuantityStepper = ({ qty, max, onChange }) => {
  const decrease = () => onChange(Math.max(1, qty - 1));
  const increase = () => onChange(Math.min(max, qty + 1));

  return (
    <div className="qty-stepper">
      <button type="button" onClick={decrease}>−</button>
      <span>{qty}</span>
      <button type="button" onClick={increase}>+</button>
    </div>
  );
};

export default QuantityStepper;