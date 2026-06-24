import React from "react";
import { Link } from "react-router-dom";

const ProductItems = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="p-2">
        <div className="overflow-hidden rounded-xl">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="mt-3 px-1">
          <h3 className="text-sm font-medium truncate">{name}</h3>
          <p className="text-gray-600 text-sm font-semibold mt-1">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItems;
