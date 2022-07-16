import { NavLink } from "react-bootstrap";
import "./Pagination.css";


interface VacationPagination {
    vacationsPerPage: number,
    totalVacations: number,
    paginate: Function
}


function Pagination(props: VacationPagination): JSX.Element {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalVacations / props.vacationsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>

            {
                pageNumbers.map((number) => (
                        <li key={number} className='page-item  border' >
                            <nav aria-label="Page navigation example ">
                                <ul className="pagination">
                                    <NavLink onClick={() => props.paginate(number)} className="page-link  active">
                                        {number}
                                    </NavLink>
                                </ul>
                            </nav>
                        </li>
                ))
            }

        </>


    );
}

export default Pagination;
