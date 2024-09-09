import React from "react";
import api from "../util/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Product";
import TopSlider from "./TopSlider";
import swal from "sweetalert";
import "./AllProducts.css";
import LottieAnimation from "../util/Loading";

function AllProduct(props) {
  const [products, setProducts] = useState([]);
  const { pcat, subcat } = useParams();
  const { pname } = useParams();
  const state = useSelector((state) => state);
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [showDialog, setShowDialog] = useState("modal fade");
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    console.log("Child call parent");
    setShowDialog("modal fade show");
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (itemName) => {
    return state.cart.findIndex((x) => x.item === itemName) < 0;
  };

  const closeDialog = () => {
    setShowDialog("modal fade");
    setDisplay("none");
  };

  useEffect(() => {
    if (products.length === 0) {
      api
        .get(`/api/v1/products`)
        .then((resp) => {
          setLoading(false);
          console.log(resp.data);
          setProducts(resp.data || []);
        })
        .catch((e) => {
          setLoading(false);
          console.log("failed to load products. Error: " + e);
        });
    }
  }, []);

  function filterFunction(x){
      if(x.image_url == "" || x.image_url == null){
        return false;
      }
      return true;
  }

  const addToCart = (product) => {
    if (state.loggedin.Username == null) {
      swal({
        title: "Warning",
        text: "Please login first to buy product",
        icon: "warning",
        button: "ok",
      });
      history.push("/clogin");
    } else if (state.loggedin.Role !== "USER") {
      swal({
        title: "Warning",
        text: "Please log-in to buy this product",
        icon: "warning",
        button: "ok",
      });
    } else {
      if (checkItem(product.item)) {
        showModal();
        setDisplay("none");
        setShowDialog("modal fade");
        product.qty = qty;
        dispatch({ type: "AddItem", payload: product });
        const updatedCart = [...state.cart, product]; //save cart to localstorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        swal({
          title: "Success",
          text: "Item added to cart successfully",
          icon: "success",
          button: "ok",
        });
      } else {
        swal({
          title: "Warning",
          text: "Item already in cart",
          icon: "warning",
          button: "ok",
        });
      }
    }
  };

  return (
    <div>
      <TopSlider />
      <div className="container-fluid" style={{ width: "92%" }}>
        <div className="">
          <div className="card-body">
            {loading ? (
              <LottieAnimation />
            ) : (
              <div className="row">
                {products &&
                  products.filter((x) => x.image_url).map((x) => (
                    <Product key={x.item} x={x} showModal={showModal} />
                  ))}
              </div>
            )}
          </div>
        </div>
        {display === "block" && (
          <div>
            <div
              className={`modal-backdrop ${showDialog ? "show" : ""}`}
              style={{ zIndex: "999", display: display }}
              onClick={closeDialog}
            ></div>
            <div
              className={`modal-container ${showDialog ? "show" : ""}`}
              style={{ zIndex: "1000", display: display }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button onClick={closeDialog} className="close">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="payment-summary">
                      <h4>Product Summary</h4>
                      <h5>{item.item}</h5>
                      <div className="column-div">
                        <div className="product-info">
                          <div className="cart-info-name">
                            <img src={item.image_url ? item.image_url : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} alt="product_image" height={'200px'} />
                          </div>
                        </div>
                        <div className="product-details">
                        <div className="cart-info">
                          <p>Brand: </p>
                          <p>{item.class}</p>
                        </div>
                          <div className="cart-info">
                            <p>Description: </p>
                            <p>{item.description_short}</p>
                          </div>
                          <div className="cart-info">
                            <p>Stock: </p>
                            <p>{item.free_stock}</p>
                          </div>
                          <div className="cart-info">
                            <p>Quantity: </p>
                            <input
                              className="custom-input"
                              type="number"
                              min="1"
                              max={item.free_stock}
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            />
                          </div>
                          <div className="cart-info total">
                            <p>Price:</p>
                            <p>&pound; {(item.retail_price * qty).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-danger mt-2" onClick={(e) => addToCart(item)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProduct;
