

function PageNotFound(): JSX.Element {
    return (

        <div className=" PageNotFound d-flex align-items-center justify-content-center mt-5">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
            </div>
        </div>

    );
}

export default PageNotFound;
