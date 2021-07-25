import "./card.css";

export default function Card({ products }) {
  return (
    <div>
      <div className="cards cards-ecom">
        {products ? (
          products.map((item) => {
            return (
              <div className="card card-ecom" key={item.productId}>
                <img
                  className="card-image text-overlay-image card-image-ecom"
                  alt="NA"
                  src={item.images[0].src}
                />

                <div className="card-content card-content-ecom">
                  <div className="product-brand">{item.brand}</div>
                  <h4 className="product-name">{item.productName}</h4>

                  <p className="card-data card-data product-price">
                    Rs. {item.price}{" "}
                    <small className="card-lighter-data">
                      {item.discountDisplayLabel}
                    </small>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading-products">Loading Products</div>
        )}
      </div>
    </div>
  );
}
