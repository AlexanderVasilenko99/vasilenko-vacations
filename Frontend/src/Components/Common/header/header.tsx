import "./header.css";

function Header(props: { title: string }): JSX.Element {
    return (
        <h1 className="header">{props.title}</h1>
    );
}

export default Header;
