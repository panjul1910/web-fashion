import React, { useState, useEffect } from 'react';

function Product() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('../data.json')
            .then(response => response.json())
            .then(data => setItems(data.items))
            .catch(error => console.error('Error loading the data:', error));
    }, []);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Product List</h1>
            <div className="row">
                {items.map((item, index) => (
                    <div key={index} className="col-md-4 mb-3 blob">
                        <a href={item.link}>
                            <div className="card">
                                <img src={item.image} className="card-img-top square-img" alt={item.nama}></img>
                                <div className="card-body">
                                    <h5 className="card-title">{item.nama}</h5>
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;


