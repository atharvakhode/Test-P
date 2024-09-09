import React, { useState } from "react";
import './Product.css';

function Product(props) {
  const { x, showModal } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const stockAvail = x.free_stock === 0 ? (((x.free_stock <= 5 && x.free_stock > 0) || x.availability === "EOL") ? "limited" : "out-of-stock") : "";

  return (
    <div className="col-md-3" key={x.item}>
      <div className="product-card">
        <div className="product-img">
          <img
            style={{ border: 'none' }}
            src={x.image_url ? x.image_url : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
            className="img-thumbnail"
            loading="lazy"
            alt={x.item}
          />
        </div>
        <div className="product-info text-center">
          <h3 className="product-name">{x.item}</h3>
          <h6 className="product-category">Brand: {x.class}</h6>
          <h6 className="product-category">Stock: {x.free_stock}</h6>
          {/* <div className="description-prod">
            <p>{x.description}</p>
          </div> */}
          <div className="description-prod">
            <p>
              {isExpanded ? x.description : `${x.description.substring(0, 20)}`}
              <a onClick={toggleDescription} color="#6574F6">
                {isExpanded ? '...less' : '...more'}
              </a>
            </p>
          </div>
          {stockAvail === "out-of-stock" ? (
            <p className="out-of-stock-text">Out of stock</p>
          ) : (
            <div className="row d-flex justify-content-around">
              <div className="product-price">&pound; {x.retail_price}</div>
              <button
                type="button"
                className="btn btn-cart mt-2"
                onClick={() => showModal(x)}
              >
                <span>🛒</span> Add to Cart
              </button>
              {/* <button
                type="button"
                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                style={{ borderRadius: '25px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => showModal(x)}
              >
                <span className="mr-2">🛒</span> Add to Cart
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
