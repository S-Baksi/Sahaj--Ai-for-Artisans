import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItems";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [region, setRegion] = useState([]);
  const [culture, setCulture] = useState([]);
  const navigate = useNavigate();

  const toggleValue = (value, setFunction) => {
    setFunction((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    if (region.length > 0) {
      filtered = filtered.filter((item) => region.includes(item.region));
    }

    if (culture.length > 0) {
      filtered = filtered.filter((item) => culture.includes(item.culture));
    }

    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  }, [category, subCategory, products, search, showSearch, priceRange, region, culture, sortType]);

  const FilterSection = ({ title, options, selected, toggle }) => (
    <div className={`border border-gray-200 rounded-lg shadow-md p-5 mt-6 bg-white ${showFilter ? "" : "hidden"} sm:block transition-all duration-300`}>
      <p className="mb-3 text-lg font-semibold text-gray-800 flex items-center">{title}</p>
      <div className="grid grid-cols-1 gap-3 text-sm font-medium text-gray-700 max-h-96 overflow-y-auto pr-2">
        {options.map((opt) => (
          <label key={opt} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 cursor-pointer ${selected.includes(opt) ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-50'}`}>
            <input
              type="checkbox"
              value={opt}
              onChange={(e) => toggleValue(e.target.value, toggle)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={selected.includes(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: product });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t bg-gradient-to-b from-gray-50 to-white">
      <div className="min-w-60 px-4 sm:px-0">
        <div
          className="my-2 text-xl flex items-center cursor-pointer gap-2 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setShowFilter(!showFilter)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          FILTERS
          <img src={assets.dropdown_icon} alt="dropdown_icon" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
        </div>

        <FilterSection title="CATEGORIES" options={["Men", "Women", "Kids"]} selected={category} toggle={setCategory} />

        <FilterSection title="CRAFT TYPE" options={["Handwoven", "Embroidery", "Terracotta", "Beadwork", "Block Printing", "Bamboo Craft", "Stone Carving", "Woodwork", "Metalwork", "Leather Craft", "Loom Weaving", "Madhubani Painting", "Warli Art"]} selected={subCategory} toggle={setSubCategory} />

        <FilterSection title="REGION" options={["North", "Northeast", "East", "West", "South"]} selected={region} toggle={setRegion} />

        <FilterSection title="CULTURE" options={["Punjabi", "Gujarati", "Rajasthani", "Bengali", "Tamil", "Malayali", "Kashmiri", "Marathi", "Assamese / Northeastern", "Kannadiga", "Telugu", "Bihari", "Odia", "Goan", "Himachali"]} selected={culture} toggle={setCulture} />

        <div className={`border border-gray-200 rounded-lg shadow-md p-5 mt-6 bg-white ${showFilter ? "" : "hidden"} sm:block transition-all duration-300`}>
          <p className="mb-3 text-lg font-semibold text-gray-800 flex items-center">PRICE RANGE</p>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <div className="flex space-x-4">
              <input type="range" min="0" max="1000" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              <input type="range" min="0" max="1000" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <Title text1="SAHAJ" text2="COLLECTIONS" />
          <div className="mt-4 sm:mt-0 relative">
            <select
              className="appearance-none bg-white border-2 border-indigo-200 rounded-lg py-2 pl-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-300 hover:border-indigo-300"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterProducts.map((product, index) => (
            <div key={index} onClick={() => handleProductClick(product)} className="cursor-pointer">
              <ProductItem {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
