import React from "react";
import Loadable from "react-loadable";

const loading = () => (
    <div className="animated fadeIn pt-3 text-center" > Loading...</div>
);

const Login = Loadable( {
    loader: () => import( "./screen/Login" ),
    loading
} );

const Home = Loadable( {
    loader: () => import( "./screen/Home" ),
    loading
} );

const Registration = Loadable( {
    loader: () => import( "./screen/Registration" ),
    loading
} );


const routes = [
    {
        exact: true,
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        exact: false,
        path: "/",
        name: "Dashboard",
        component: Home
    },
];

export default routes;