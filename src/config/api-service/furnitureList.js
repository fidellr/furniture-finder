//#region PACKAGE IMPORTS
import axios from 'axios';
import { FURNITURE_LIST_URI } from './constants';
//#endregion



export const fetchFurnitureProducts = () => axios.get(FURNITURE_LIST_URI);
