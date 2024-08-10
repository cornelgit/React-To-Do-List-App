import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>
                        &copy; {new Date().getFullYear()} Cornel Stoica. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
