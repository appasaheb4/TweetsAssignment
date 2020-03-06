import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from "reactstrap";
import Fab from "@material-ui/core/Fab";
import { FaPlusCircle } from "react-icons/fa";
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
    const [ flagModal, setFlagModal ] = useState( false );

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

    const toogleModel = () => setFlagModal( !flagModal );

    return (
        <div>
            <TopNavbarComp />
            <h1>{ `hi ${ user.societyName }` }</h1>
            <Loader fullPage loading={ loading } />

            <Fab
                color="primary"
                size="medium"
                style={ { position: 'absolute', right: 20, bottom: 20 } }
                onClick={ toogleModel }
            >
                <FaPlusCircle />
            </Fab>
            <ToastsContainer store={ ToastsStore } />
        </div>
    );
}



