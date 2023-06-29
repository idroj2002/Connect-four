import './Cell.css'

export function Cell({ color }) {
    return (
        <div className='cell'>
            { color != undefined ? <div className={`${color} circle`}></div> : <></> }
        </div>
    )
}