import React, { Component } from "react";
import TabList from '../tabs/tabs';
import Search from "../search/search";
import '../../css/normalize.css'
import '../../css/app.css'
import MovieApi from "../Api/api";
import CardList from "../CardsList/card_list";
import Pagin from "../pagination/pagination";

export default class App extends Component{
    
    api=new MovieApi();

    
     
    render(){
        
        return(
            <div className="moviesApp">
                 <TabList/>  
                 <Search/>
                 <CardList/>
                 <Pagin/>

            </div>
           
        )
        
    }
        
}