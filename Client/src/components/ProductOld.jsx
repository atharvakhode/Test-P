import React from "react";
function Product(props) {
  const { x, showModal } = props;

  return (
    <>
      <div class="col-md-3" key={x.prodid}>
        <div class="wsk-cp-product">
          <div class="wsk-cp-img">
            <img
              style={{ width: "90%", height: "250px", marginBottom: "10px" }}
              src={x.photo}
              className="img-thumnail"
            />
          </div>
          <div class="wsk-cp-text">
            <div class="title-product">
              <h3 className="text-md">{x.pname}</h3>
              <h6>Brand :{x.brand}</h6>
            </div>
            <div class="description-prod ">
              <p>
                Lorem ipsum dorro I don't know what comes next but I need to
                make a paragraph either way so random gibberish go!
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <div class="wcf-left">
                <span class="price">&pound; {x.price}</span>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => showModal(x)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
