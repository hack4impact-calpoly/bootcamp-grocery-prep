import './App.css';
import React from 'react'
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom'
import Header from './Header'
import './styles.css'
import style from './App.module.css'
import Home from './Home'
import About from './About'
import Recipe from './Recipe'
import Cart from './Cart'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCart: false,
            ingredients: {},
        }

        this.switchShowCart = this.switchShowCart.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.clearCart = this.clearCart.bind(this)
    }

    switchShowCart() {
        this.setState(state => ({showCart: !state.showCart}))
    }

    clearCart() {
        this.setState({ingredients: {}})
    }

    updateIngredients(newIngredients) {
        this.setState(state => {
            let updatedIngredients = {... state.ingredients}
            for (let curIngredient in newIngredients) {
                if (curIngredient in state.ingredients) {
                    updatedIngredients[curIngredient] += newIngredients[curIngredient] // Add more of same ingredient
                }
                else {
                    updatedIngredients[curIngredient] = newIngredients[curIngredient] // Add new ingredient
                }
                state.count += 1
            }
            return ({
                ingredients: updatedIngredients,
                showCart: true,
            })
        })
    }

    render () {
        return (
            <BrowserRouter>
            <div className={style.wrapper}>
                <Header switchShowCart={this.switchShowCart}/>
                <Cart ingredients={this.state.ingredients} showCart={this.state.showCart} clearCart={this.clearCart}/>
                <div className={style.content}>
                <Switch>
                    <Route path='/recipe/:recipeName'><Recipe updateIngredients={this.updateIngredients}/></Route>
                    <Route path='/about'><About /></Route>
                    <Route path='/'><Home /></Route>
                </Switch>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
