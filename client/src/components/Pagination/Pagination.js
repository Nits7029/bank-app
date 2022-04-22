//library
import React from "react";
import ReactPaginate from "react-paginate";
import './styles.css'

const Pagination = ({
    currentPage,
    handlePagination,
    totalRecords,
    limit,
}) => {
    if (totalRecords === 0) {
        currentPage = currentPage - 1;
    }
    return (
        <div >
            <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                forcePage={currentPage}
                onPageChange={(page) => handlePagination(page)}
                pageCount={totalRecords / limit}
                breakLabel={"..."}
                className="pagination"
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                activeClassName={"active"}
                pageClassName={"page-item"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item next"}
                previousClassName={"page-item prev"}
                previousLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    );
};

export default Pagination