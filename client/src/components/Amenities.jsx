const Amenities = ({ amenity, handleAmenitiesCheckbox }) => {
  const { title, icon } = amenity;
  return (
    <label className="border p-4 flex items-center gap-1.5 rounded-md cursor-pointer">
      <input type="checkbox" name={title} onChange={handleAmenitiesCheckbox} />
      {icon}
      <span>{title}</span>
    </label>
  );
};

export default Amenities;
