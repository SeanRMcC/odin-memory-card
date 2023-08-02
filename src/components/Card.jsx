import "./../styles.css";

export default function Card(props){

    return (
        <button onClick={props.handleClick}>
            <img src={props.image} />
        </button>
    );
}