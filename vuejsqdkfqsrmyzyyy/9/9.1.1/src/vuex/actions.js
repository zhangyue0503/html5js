import {ADD_ITEM} from './mutation-type.js'

export const addItem = ({dispatch,store},item)=>{dispatch('ADD_ITEM',item)}

export const deleteItem = ({dispatch,store})->{dispatch('DELETE_ITEM')}