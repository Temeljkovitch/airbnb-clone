const Amenities = ({ amenity }) => {
  const { title, icon } = amenity;
  return (
    <label className="border p-4 flex items-center gap-1.5 rounded-md cursor-pointer">
      <input type="checkbox" />
      {icon}
      <span>{title}</span>
    </label>
  );
};

export default Amenities;
