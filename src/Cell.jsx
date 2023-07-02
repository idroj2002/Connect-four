import './Cell.css'

export function Cell({ color, isHover }) {
    return (
        <div className={`cell ${isHover ? 'isHover' : ''}`}>
            { color != undefined ? <div className={`circle ${color}`}></div> : <></> }
        </div>
    )
}