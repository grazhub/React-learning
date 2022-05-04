"use strict";

const React = require('react');
const ReactDOM = require('react-dom');

const IshopComponent3 = require('./components/IshopComponent3');

const shopName = "Ishop";
const productList = [
	{ code: 1, name: "Huawei nova 9 SE JLN-LX1", price: 406.59, count: 34, photo: "https://content2.onliner.by/catalog/device/header@2/32da9b518aff15a22314d05ad01c413f.jpeg"},
	{ code: 2, name: "HONOR 50", price: 459.90, count: 34, photo: "https://content2.onliner.by/catalog/device/header@2/fe938a7b32281eeb384db8c9cd75cc0b.jpeg"},
	{ code: 3, name: "iphone X", price: 609.99, count: 34, photo: "https://content2.onliner.by/catalog/device/header@2/98b65279323ea2beeba0c347f365f728.jpeg"},
];
ReactDOM.render(
	React.createElement(IshopComponent3, { products: productList, shopName: shopName }), 
	document.getElementById('container') 
);