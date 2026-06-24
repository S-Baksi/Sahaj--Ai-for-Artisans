import React, { useState } from 'react';
import './ArtisanPricing.css';

const ArtisanPricing = () => {
  // Sample data - in a real app, this would come from an API
  const [artisans] = useState([
    {
      id: 1,
      name: "Maria Gonzalez",
      products: [
        {
          id: 101,
          name: "Handwoven Blanket",
          materialsCost: 45,
          laborCost: 60,
          overheadCost: 15,
          totalCost: 120,
          sellingPrice: 180,
          soldCount: 12,
          remainingCount: 8,
          lastSoldDate: "2023-05-15"
        },
        {
          id: 102,
          name: "Ceramic Mug Set",
          materialsCost: 20,
          laborCost: 30,
          overheadCost: 10,
          totalCost: 60,
          sellingPrice: 90,
          soldCount: 25,
          remainingCount: 5,
          lastSoldDate: "2023-05-10"
        }
      ]
    },
    {
      id: 2,
      name: "Kwame Osei",
      products: [
        {
          id: 201,
          name: "Wooden Carving",
          materialsCost: 30,
          laborCost: 80,
          overheadCost: 20,
          totalCost: 130,
          sellingPrice: 200,
          soldCount: 5,
          remainingCount: 3,
          lastSoldDate: "2023-05-12"
        }
      ]
    },
    {
      id: 3,
      name: "Leila Abboud",
      products: [
        {
          id: 301,
          name: "Embroidered Shawl",
          materialsCost: 25,
          laborCost: 50,
          overheadCost: 12,
          totalCost: 87,
          sellingPrice: 140,
          soldCount: 18,
          remainingCount: 2,
          lastSoldDate: "2023-05-14"
        },
        {
          id: 302,
          name: "Decorative Pillow",
          materialsCost: 18,
          laborCost: 35,
          overheadCost: 10,
          totalCost: 63,
          sellingPrice: 95,
          soldCount: 10,
          remainingCount: 10,
          lastSoldDate: "2023-05-08"
        }
      ]
    }
  ]);

  const [expandedArtisan, setExpandedArtisan] = useState(null);

  const toggleArtisan = (id) => {
    setExpandedArtisan(expandedArtisan === id ? null : id);
  };

  const calculateProfit = (product) => {
    return product.sellingPrice - product.totalCost;
  };

  const calculateProfitMargin = (product) => {
    return ((product.sellingPrice - product.totalCost) / product.sellingPrice * 100).toFixed(1);
  };

  return (
    <div className="artisan-pricing-container">
      <h1>Artisan Product Pricing Breakdown</h1>
      <p className="subtitle">Detailed cost analysis from creation to sale</p>
      
      <div className="artisans-list">
        {artisans.map(artisan => (
          <div key={artisan.id} className="artisan-card">
            <div 
              className="artisan-header" 
              onClick={() => toggleArtisan(artisan.id)}
            >
              <h2>{artisan.name}</h2>
              <span className="toggle-icon">
                {expandedArtisan === artisan.id ? '−' : '+'}
              </span>
            </div>
            
            {expandedArtisan === artisan.id && (
              <div className="products-list">
                {artisan.products.map(product => (
                  <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    
                    <div className="cost-breakdown">
                      <h4>Cost Breakdown</h4>
                      <ul>
                        <li>Materials: ${product.materialsCost}</li>
                        <li>Labor: ${product.laborCost}</li>
                        <li>Overhead: ${product.overheadCost}</li>
                        <li className="total-cost">Total Cost: ${product.totalCost}</li>
                      </ul>
                    </div>
                    
                    <div className="pricing-info">
                      <h4>Pricing & Sales</h4>
                      <ul>
                        <li>Selling Price: ${product.sellingPrice}</li>
                        <li>Profit per item: ${calculateProfit(product)}</li>
                        <li>Profit Margin: {calculateProfitMargin(product)}%</li>
                      </ul>
                    </div>
                    
                    <div className="inventory-info">
                      <h4>Inventory Status</h4>
                      <div className="inventory-bar">
                        <div 
                          className="sold-bar" 
                          style={{ width: `${(product.soldCount / (product.soldCount + product.remainingCount)) * 100}%` }}
                        >
                          <span>Sold: {product.soldCount}</span>
                        </div>
                        <div 
                          className="remaining-bar" 
                          style={{ width: `${(product.remainingCount / (product.soldCount + product.remainingCount)) * 100}%` }}
                        >
                          <span>Remaining: {product.remainingCount}</span>
                        </div>
                      </div>
                      <p>Last sold: {product.lastSoldDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisanPricing;
