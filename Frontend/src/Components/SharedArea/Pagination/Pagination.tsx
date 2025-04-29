import "./Pagination.css";

interface VacationPaginationProps {
    vacationsPerPage: number;
    totalVacations: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

function Pagination(props: VacationPaginationProps): JSX.Element {

    const pageNumbers = [];

    const totalPages = Math.ceil(props.totalVacations / props.vacationsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePrev = () => {
        if (props.currentPage > 1) {
            props.paginate(props.currentPage - 1);
        }
    };

    const handleNext = () => {
        if (props.currentPage < totalPages) {
            props.paginate(props.currentPage + 1);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">

                {/* Previous Button */}
                <li className={`page-item ${props.currentPage === 1 ? "disabled" : ""}`}>
                    <button onClick={handlePrev} className="page-link">
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${props.currentPage === number ? "active" : ""}`}>
                        <button onClick={() => props.paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${props.currentPage === totalPages ? "disabled" : ""}`}>
                    <button onClick={handleNext} className="page-link">
                        Next
                    </button>
                </li>

            </ul>
        </nav>
    );
}

export default Pagination;
