import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout(props) {
    return (
        <>
            <Navbar id={props.id} onLogout={props.onLogout} />
            <Outlet/>
        </>
    )
}