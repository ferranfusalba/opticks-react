import "./Widgets.scss"

function WidgetsWrapper({children}) {
    return (
        <div className="widgets">
            {children}
        </div>
    )
}

export default WidgetsWrapper;