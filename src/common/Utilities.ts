export const checkForUndefined = ( object: any ) => {
    console.log( { object } );
    for ( var key in object ) {
        if ( object[ key ] === undefined )
            return true;
    }
    return false;
}
