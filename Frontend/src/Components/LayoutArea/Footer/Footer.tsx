import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <footer className="Footer">
      <p>© {new Date().getFullYear()} Vacation App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
