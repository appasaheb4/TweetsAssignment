import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav
} from 'reactstrap';

import fonts from "../../common/Fonts";
import colors from "../../common/Colors";

export default function TopNavbarComp( props ) {
    console.log( { props } );
    const [ isOpen, setIsOpen ] = useState( false );
    const toggle = () => setIsOpen( !isOpen );
    return (
        <Navbar color="primary" light expand="md">
            <NavbarBrand href="/" style={ { fontFamily: fonts.FiraSansBold, color: colors.white } }>Tweets Manage</NavbarBrand>
            <NavbarToggler onClick={ toggle } />
            <Collapse isOpen={ isOpen } navbar>
                <Nav className="dropdown-menu-right" navbar>

                </Nav>
            </Collapse>
        </Navbar>
    )
}

