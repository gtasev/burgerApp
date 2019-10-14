import React, {Component} from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // console.log(props.ingredients);
    // console.log(Object.keys(props.ingredients));
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        // console.log('de da vidam so nose taj be');
        // console.log(igKey);
        // console.log(props.ingredients[igKey]);
        // console.log(Array(props.ingredients[igKey]));
        return [...Array(props.ingredients[igKey])].map((_, i) => {     // ne mi e jasno so se desava tuka!!!
           return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    console.log('transformedIngredients')
    console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;