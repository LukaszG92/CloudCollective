import {useNavigate} from "react-router-dom";

function NavbarElement(props) {
    const navigate = useNavigate();

    return (
        <div className="navbarButton" onClick={() => {
            navigate("/")
            console.log(props.name+"clicked")
            }}
        >
            <img
                src={props.img}
                alt=""
                className="navbarButtonIcon"
            />
            <span className="navbarButtonName">{props.name}</span>
        </div>
    )
}

export default NavbarElement;