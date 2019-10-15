import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchaising: false
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {...updatedIngredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0 ) {
            const ingredientsHelper = {...this.state.ingredients};
            ingredientsHelper[type] = ingredientsHelper[type] - 1;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: newPrice, ingredients: ingredientsHelper})
            this.updatePurchaseState(ingredientsHelper);
        }
    }

    purchaseHandler = () => {
        this.setState({purchaising: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchaising: false});
    }
    
    purchaseContinueHandler = () => {
        alert('You continue!')
    }

    render () {
        const disableInfo ={
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Auxiliary>
               <Modal show={this.state.purchaising} modalClosed={this.purchaseCancelHandler}>
                   <OrderSummary    ingredients={this.state.ingredients}
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    price={this.state.totalPrice}
                                    purchaseContinued={this.purchaseContinueHandler} />
               </Modal>
               <Burger ingredients={this.state.ingredients} /> 
               <BuildControls
                    disabled = { disableInfo }
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    /> 
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;