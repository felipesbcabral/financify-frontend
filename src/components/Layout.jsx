import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
    return (
        <>
            <Navbar id={props.id} onLogout={props.onLogout} />
            <Outlet/>
            <Footer id={props.id} onLogout={props.onLogout} />
        </>
    )
}