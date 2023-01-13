import "./ContentLayout.scss"

function ContentLayout({ children }) {
    return (
        <div className="content_layout">
            {children}
        </div>
    )
}

export default ContentLayout;