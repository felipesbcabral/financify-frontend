function Nav(props) {
    return (
        <ul>
            {props.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
    )

}

export default Nav