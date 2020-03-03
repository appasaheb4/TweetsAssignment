import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from "reactstrap";
import { Loader } from "react-overlay-loader";
import { ToastsContainer, ToastsStore } from "react-toasts";

import { TopNavbarComp } from "../components/Navbar";


//Custome Files  
import { apiary } from "../common/Constants";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from "../redux/actions/login";

export default function Home( props ) {
    const [ loading, setLoading ] = useState( false );
    const [ user, setUser ] = useState( {} );

    const dispatch = useDispatch();
    const { resLogin } = useSelector( state => state.login );

    useEffect( () => {
        let loginSeesionData = localStorage.getItem( "User" );
        if ( loginSeesionData == null ) {
            props.history.push( "/login" );
        } else {
            setUser( JSON.parse( loginSeesionData ) );
        }
    }, [] )

    return (
        <div>
            <TopNavbarComp />
            <h1>{ `hi ${ user.societyName }` }</h1>
            <Loader fullPage loading={ loading } />
            <ToastsContainer store={ ToastsStore } />
        </div>
    );
}



