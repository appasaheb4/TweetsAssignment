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

import { checkForUndefined } from "../common/Utilities";



// redux
import { useDispatch, useSelector } from 'react-redux';
import { onRegister } from "../redux/actions/register";

export default function Registration( props ) {
    const [ loading, setLoading ] = useState( false );
    const [ validate, setValidate ] = useState( { name: false, email: false, phone: false, password: false, confPass: false } );
    const [ input, setInput ] = useState( {} );

    const dispatch = useDispatch();
    const { resRegister } = useSelector( state => state.register );





    const click_Registration = ( e: any ) => {
        e.preventDefault();
        const data = {
            date: Math.round( +new Date() / 1000 ),
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.confirmPassword.value,
        }
        console.log( { data } );

        if ( checkForUndefined( data ) )
            alert( "Please enter all info." )
        else
            dispatch( onRegister( { url: "http://dummy.restapiexample.com/api/v1/create", data: data } ) )
    }


    useEffect( () => {
        if ( resRegister.loading )
            alert( resRegister.status );
    }, [ resRegister ] )

    return (
        <div className="align-items-center">
            <div className="d-flex justify-content-center" style={ { marginTop: 20 } }>
                <form onSubmit={ click_Registration }>
                    <h3 style={ { textAlign: "center" } }>REGISTRATION FORM</h3>
                    <div className="form-group form-inline">
                        <label className="col-md-3">Name:</label>
                        <input className="form-control col-md-9"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            onBlur={ ( e ) => {
                                if ( e.target.value.length > 0 )
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
                                var minNumberofChars = 6;
                                var maxNumberofChars = 16;
                                var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                                if ( e.target.value.length < minNumberofChars || e.target.value.length > maxNumberofChars ) {
                                    setValidate( { ...validate, password: true } )
                                }
                                else if ( !regularExpression.test( e.target.value ) ) {
                                    setValidate( { ...validate, password: true } )
                                }
                                else
                                    setValidate( { ...validate, password: false } )
                                setInput( { ...input, password: e.target.value } )
                            } }
                        />
                        { validate.password ? ( <h6 className="error">Password should contain atleast one number ,one special character and min length 6.</h6> ) : null }
                        <div className="clearfix" />
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
                                    setValidate( { ...validate, confPass: true } )
                                } else {
                                    setValidate( { ...validate, confPass: false } )
                                }
                            } }
                        />
                        { validate.confPass ? ( <h6 className="error">Password must match with confirm password.</h6> ) : null }
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



