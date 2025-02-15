import React from 'react'

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { newUID } from '../../../helper';

const controls = [
    {id:newUID(), label: 'Salad', type: 'salad'},
    {id:newUID(), label: 'Bacon', type: 'bacon'},
    {id:newUID(), label: 'Cheese', type: 'cheese'},
    {id:newUID(), label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.id} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)} 
                disabled = { props.disabled[ctrl.type] }
                />
        ))}
        <button className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;