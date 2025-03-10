import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectedProduct } from '../Redux/Actions/productActions';

const ProductDetail = () => {
    const product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const { productId }= useParams();
    const dispatch = useDispatch();
    console.log(product);

    const fetchProductDetail = async () => {
      


        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch (err => {
            console.log(err);
        });
        dispatch(selectedProduct(response.data));
    };
    useEffect(() => {
        if(productId && productId !== "") fetchProductDetail();
    },[productId]);

    const imageStyle = { width:'50%', margin: "10px auto", padding: "10px auto", borderRedius: "100px"}
    return (
        <div className="product mt-5">
          <div className="ui grid container mt-5">
        {Object.keys(product).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider">AND</div>
              <div className="middle aligned row">
                <div className="column lp">
                  <img className="ui fluid image" style={imageStyle} src={image} />
                </div>
                <div className="column rp">
                  <h1>{title}</h1>
                  <h2>
                    <a className="ui teal tag label">${price}</a>
                  </h2>
                  <h3 className="ui brown block header">{category}</h3>
                  <p>{description}</p>
                  <div className="ui vertical animated button" tabIndex="0">
                    <div className="hidden content">
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content">Add to Cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        </div>
    );
};

export default ProductDetail;