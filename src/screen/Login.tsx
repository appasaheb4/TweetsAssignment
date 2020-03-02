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


//Css Files
import "./index.css";


//Custome Files  
import { apiary } from "../common/Constants";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from "../redux/actions/login";

export default function Login( props ) {
    const [ loading, setLoading ] = useState( false );

    const dispatch = useDispatch();
    const { resLogin } = useSelector( state => state.login );




    useEffect( () => {
        let loginSeesionData = localStorage.getItem( "User" );
        if ( loginSeesionData != null ) {
            props.history.push( "/dashboard" );
        }
    }, [] );


    const click_Login = ( e: any ) => {
        e.preventDefault();
        let mobileNo = e.target.mobileNo.value;
        let password = e.target.password.value;
        var data = {
            mobileNo,
            password
        };
        dispatch( onLogin( { url: apiary.webLoginSocietyUser, data } ) )
    }

    useEffect( () => {
        console.log( { resLogin } );
        if ( resLogin.loading ) {
            if ( resLogin.statusCode == 200 ) {
                localStorage.setItem( "User", JSON.stringify( resLogin.data[ 0 ] ) );
                props.history.push( {
                    pathname: "/dashboard",
                    state: { data: resLogin.data[ 0 ] }
                } );
            } else {
                ToastsStore.error( resLogin.data );
            }
        }
    }, [ resLogin ] );

    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <h1 style={ { textAlign: "center" } }>Welcome  to Tweets Management</h1>
                                    <div className="well">
                                        <form onSubmit={ ( e ) => click_Login( e ) }>
                                            <div className="form-group">
                                                <input
                                                    type="number"
                                                    name="mobileNo"
                                                    className="form-control"
                                                    placeholder="Mobile No"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div style={ { textAlign: "center" } }>
                                                <div className="form-group">
                                                    <input
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        value="Login"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
                <Loader fullPage loading={ loading } />
                <ToastsContainer store={ ToastsStore } />
            </Container>
        </div>
    );
}



