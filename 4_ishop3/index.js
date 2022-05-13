import React from 'react';
import ReactDOM  from 'react-dom';

import IshopComponent3 from './components/IshopComponent3';
import productList from "./products.json";

const shopName = "Ishop";

ReactDOM.render(
	<IshopComponent3 products = { productList } shopName = { shopName }/>,
	document.getElementById('container') 
);