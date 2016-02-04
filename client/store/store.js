import { createStore } from 'redux'
import user from './../reducers/reducers'

export let store = createStore(user);