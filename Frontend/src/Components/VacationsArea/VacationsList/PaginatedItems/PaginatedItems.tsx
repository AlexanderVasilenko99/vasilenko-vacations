import { useState } from "react";
import ReactPaginate from "react-paginate";
import PaginatedItemsPropsModel from "../../../../Models/PaginatedItemsPropsModel";
import { vacationsStore } from "../../../../Redux/VacationsState";
import Items from "../Items/Items";

function PaginatedItems({ itemsPerPage, itemsToDisplay }: PaginatedItemsPropsModel): JSX.Element {
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(itemsToDisplay.length / itemsPerPage);
    itemsToDisplay = itemsToDisplay.slice(itemOffset, endOffset);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % vacationsStore.getState().vacations?.length;
        setSelectedPage(event.selected);
        setItemOffset(newOffset);
    };

    return (
        <>
            {pageCount && <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={0}
                marginPagesDisplayed={2}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                forcePage={selectedPage}
            />}
            <Items currentItems={itemsToDisplay} />
            {pageCount && <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={0}
                marginPagesDisplayed={2}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                forcePage={selectedPage}
            />}
        </>
    );
}
export default PaginatedItems;