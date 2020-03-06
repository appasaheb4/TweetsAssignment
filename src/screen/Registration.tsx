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

// css   
import "../common/Styles.css";



// redux
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from "../redux/actions/login";

export default function Registration( props ) {
    const [ loading, setLoading ] = useState( false );
    const [ validate, setValidate ] = useState( { name: false, email: false, phone: false, password: false } );
    const [ input, setInput ] = useState( {} );

    const dispatch = useDispatch();
    const { resLogin } = useSelector( state => state.login );


    const click_Registration = ( e: any ) => {

    }

    return (
        <div className="align-items-center">
            <div className="d-flex justify-content-center" style={ { marginTop: 20 } }>
                <form onSubmit={ ( e ) => click_Registration( e ) }>
                    <h3 style={ { textAlign: "center" } }>REGISTRATION FORM</h3>
                    <div className="form-group form-inline">
                        <label className="col-md-3">Name:</label>
                        <input className="form-control col-md-9"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            onBlur={ ( e ) => {
                                if ( e.target.value > 0 )
                                    if ( ( e.target.value ).match( /[a-zA-z-_\s]/g ).length != ( e.target.value ).length ) {
                                        setValidate( { ...validate, name: true } )
                                    } else {
                                        setValidate( { ...validate, name: false } )
                                    }
                                else
                                    setValidate( { ...validate, name: true } )
                            }
                            }
                        />
                        { validate.name ? ( <h6 className="error">Please enter correct name</h6> ) : null }
                        <div className="clearfix" />
                    </div>

                    <div className="form-group form-inline">
                        <label className="col-md-3">Email:</label>
                        <input className="form-control col-md-9"
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onBlur={ ( e ) => {
                                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                if ( !e.target.value.match( mailformat ) ) {
                                    setValidate( { ...validate, email: true } )
                                } else {
                                    setValidate( { ...validate, email: false } )
                                }
                            } }
                        />
                        { validate.email ? ( <h6 className="error">Please enter correct email</h6> ) : null }
                        <div className="clearfix" />
                    </div>

                    <div className="form-group form-inline">
                        <label className="col-md-3">Phone:</label>
                        <input className="form-control col-md-9"
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            required
                            onBlur={ ( e ) => {
                                var reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                                var OK = e.target.value.match( reg );
                                console.log( { OK } );
                                if ( !OK ) {
                                    setValidate( { ...validate, phone: true } )
                                } else {
                                    setValidate( { ...validate, phone: false } )
                                }
                            } }
                        />
                        { validate.phone ? ( <h6 className="error">Please enter correct phone</h6> ) : null }
                        <div className="clearfix" />
                    </div>
                    <div className="form-group form-inline">
                        <label className="col-md-3">Password:</label>
                        <input className="form-control col-md-9"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onBlur={ ( e ) => {
                                setInput( { ...input, password: e.target.value } )
                            } }
                        />
                    </div>
                    <div className="form-group form-inline">
                        <label className="col-md-3">Confirm Password:</label>
                        <input className="form-control col-md-9"
                            type="password"
                            name="confirmPassword"
                            placeholder="Password"
                            required
                            onBlur={ ( e ) => {


                                if ( input.password != e.target.value || e.target.value == "" ) {
                                    setValidate( { ...validate, password: true } )
                                } else {
                                    setValidate( { ...validate, password: false } )
                                }
                            } }
                        />
                        { validate.password ? ( <h6 className="error">Password must match with confirm password.</h6> ) : null }
                        <div className="clearfix" />
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
            <Loader fullPage loading={ loading } />
            <ToastsContainer store={ ToastsStore } />
        </div>
    );
}



