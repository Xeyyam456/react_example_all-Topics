import { useState } from 'react';
import ProductService from '../../../services/ProductService';

function useShopProducts() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [checked, setChecked]         = useState(false);

  function load() {
    if (productList.length > 0) { setChecked(true); return; }
    setLoading(true);
    ProductService.getProducts()
      .then((data) => { setProductList(data); setChecked(true); })
      .finally(() => setLoading(false));
  }

  return { productList, loading, checked, setChecked, load };
}

export default useShopProducts;
