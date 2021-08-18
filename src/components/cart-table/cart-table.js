import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({ items, deleteFromCart,RestoService}) => {
    return (
        <div className="cart-table">
            <div className="cart__title">Your order:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const { title, price, url, id } = item;
                        let { count = 1 } = item;
                    
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} alt={title} className="cart__item-img"></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-price">{count}</div>
                                <div
                                    onClick={() => deleteFromCart(id)}
                                    className="cart__close">
                                    &times;
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => {
                RestoService.setOrder(generateOrder(items));
                items.forEach(element => {
                    deleteFromCart(element.id);
                });
                setMessage("Thank you for order");
            }} className="order">Buy</button>
        </div>
    );
};

const setMessage = (message) => {
    const mapCanvas = document.querySelector('.cart-table');

    const messageContainer = document.createElement('div');

    messageContainer.style.zIndex = 5;
    messageContainer.style.display = 'block';
    messageContainer.style.color = 'black';
    messageContainer.style.width = '280px';
    messageContainer.style.padding = '30px 10px';
    messageContainer.style.margin = '10px auto';
    messageContainer.style.fontSize = '25px';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.borderRadius = '20px';
    messageContainer.style.backgroundColor = 'green';

    messageContainer.textContent = message;

    mapCanvas.append(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            count: item.count
        }
    })
    return newOrder;
}

const mapStateToProps = ({ items }) => {
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));