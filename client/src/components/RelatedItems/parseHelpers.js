import axios from 'axios';
import {TOKEN} from '/MyConfig.js';

const options = {
  baseURL: 'http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/',
  headers: {Authorization: TOKEN}
}

export const getRelatedProducts = productId => {
  return axios.get(`/products/${productId}/related`, options)
  .then(data => {
    let newData = data.data.map(product => {
      return getProduct(product);
    })
    return Promise.all(newData);
  })
}

export const getProduct = product => {
  return axios.get(`/products/${product}`, options).then(product => {
    return axios.get(`/products/${product.data.id}/styles`, options).then(styles => {
      product.styles = styles;
      return product;
    })}).then(product => {
      return axios.get(`/reviews/meta/?product_id=${product.data.id}`, options).then(reviews => {
        product.reviews = reviews;
        return product;
      })
    })
}


