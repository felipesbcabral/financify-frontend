function Title(props) {
    // if (props.texto) {
    //     return <h1>{props.texto}</h1>;

    // } else {
    //     return <h1>Titulo</h1>
    // }
    // // pode ser assim tbm ?:
    //  return <h1>
    //     {props.texto ? props.texto: "titulo"}
    //  </h1>
    return (props.texto && <h1>{props.texto}</h1>)
}
  export default Title
