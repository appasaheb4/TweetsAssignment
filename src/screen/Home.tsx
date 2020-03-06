import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import Fab from "@material-ui/core/Fab";
import { FaPlusCircle } from "react-icons/fa";
import { Loader } from "react-overlay-loader";
import { ToastsContainer, ToastsStore } from "react-toasts";

import { TopNavbarComp } from "../components/Navbar";


//Custome Files  
import { apiary } from "../common/Constants";
import { getUnixToDateFormat } from "../common/Utilities";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { onGetTweets, onAddTweets, onDeleteTweets } from "../redux/actions/tweets";

export default function Home( props ) {
    const [ loading, setLoading ] = useState( false );
    const [ data, setData ] = useState( [] );
    const [ user, setUser ] = useState( {} );
    const [ flagModal, setFlagModal ] = useState( false );

    const dispatch = useDispatch();
    const { resTweets, resAddTweets, resDeleteTweets } = useSelector( state => state.tweets );

    useEffect( () => {
        if ( resTweets.loading )
            setData( resTweets.data )
    }, [ resTweets ] )


    useEffect( () => {
        let loginSeesionData = localStorage.getItem( "User" );
        if ( loginSeesionData == null ) {
            props.history.push( "/login" );
        } else {
            setUser( JSON.parse( loginSeesionData ) );
            dispatch( onGetTweets( { url: apiary.getTweets } ) );
        }
    }, [] )

    useEffect( () => {
        if ( resAddTweets.loading ) {
            alert( resAddTweets.data )
            toogleModel();
            dispatch( onGetTweets( { url: apiary.getTweets } ) );
        }

    }, [ resAddTweets ] )

    useEffect( () => {
        if ( resDeleteTweets.loading ) {
            alert( resDeleteTweets.data )
            dispatch( onGetTweets( { url: apiary.getTweets } ) );
        }
    }, [ resDeleteTweets ] )



    const toogleModel = () => setFlagModal( !flagModal );

    const click_Save = ( e ) => {
        e.preventDefault();
        const data = {
            date: Math.round( +new Date() / 1000 ),
            title: e.target.title.value,
            description: e.target.description.value,
        }
        dispatch( onAddTweets( { url: apiary.addTweets, data } ) )
    }

    const getList = () => {
        return (
            data.map( ( item: any ) =>
                <div className="media border p-3">
                    <i className="fas fa-user" style={ { fontSize: 30, padding: 20 } }></i>
                    <div className="media-body">
                        <h4>{ item.title } <small><i>Posted on { getUnixToDateFormat( item.createDate ) }</i></small></h4>
                        <p>{ item.description }</p>

                    </div>
                    <i className="fas fa-trash" style={ { fontSize: 20, padding: 20 } } onClick={ () => dispatch( onDeleteTweets( { url: apiary.deleteTweet, data: { id: item.id } } ) ) }></i>
                </div>
            )
        )
    }

    return (
        <div>
            <TopNavbarComp />
            <div>
                { getList() }
            </div>
            <Loader fullPage loading={ loading } />
            <Fab
                color="primary"
                size="medium"
                style={ { position: 'absolute', right: 20, bottom: 20 } }
                onClick={ toogleModel }
            >
                <FaPlusCircle />
            </Fab>
            <Modal isOpen={ flagModal } toggle={ toogleModel } >
                <ModalHeader >Add Tweet</ModalHeader>
                <form onSubmit={ click_Save }
                >
                    <ModalBody>
                        <div className="form-group form-inline">
                            <label className="col-3">Title</label>
                            <input className="form-control col-7" type="text" name="title" required />
                        </div>
                        <div className="form-group form-inline">
                            <label className="col-3">Description </label>
                            <textarea rows={ 2 } className="form-control col-7" name="description" required></textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" >Save</Button>
                        <Button color="secondary" onClick={ toogleModel }>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
            <ToastsContainer store={ ToastsStore } />
        </div>
    );
}



