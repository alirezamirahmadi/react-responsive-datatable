import React, { useState, useEffect } from "react";

import { PaginationType } from "../Type/Type";
import './Pagination.css'

export default function Pagination({ pageCount, currentPage, options, pageNoHandler, justifyContent = 'center', next, previous, first, last }: PaginationType): React.JSX.Element {
	const [pageNo, setPageNo] = useState<number[]>([]);
	const [rowPerPage, setRowPerPage] = useState<number>(10);

	const handleChengeRowPerPage = (value: number) => {
		setRowPerPage(value);
		pageNoHandler(currentPage, value);
	}

	useEffect(() => {
		let tempArray = []
		for (let i = 1; i <= pageCount; i++) {
			tempArray.push(i)
		}
		setPageNo([...tempArray])
	}, [pageCount])

	return (
		<>
			<div className="pagination">
				<div className={`pages pages--${justifyContent}`} style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor:options?.color?.borderColor }}>
					{first && <input type="button" title={options?.textLabels?.pagination?.first} className="pages__no" value='<<' disabled={currentPage === 1} onClick={() => pageNoHandler(1, rowPerPage)} />}
					{previous && <input type="button" title={options?.textLabels?.pagination?.previous} className="pages__no" value='<' disabled={currentPage === 1} onClick={() => pageNoHandler(currentPage > 1 ? currentPage - 1 : currentPage, rowPerPage)} />}
					{pageNo.map(no =>
						<input key={no} type="button" className="pages__no" value={no} onClick={() => pageNoHandler(no, rowPerPage)} />
					)}
					{next && <input type="button" title={options?.textLabels?.pagination?.next} className="pages__no" value='>' disabled={currentPage === pageNo.length} onClick={() => pageNoHandler(currentPage < pageCount ? currentPage + 1 : currentPage, rowPerPage)} />}
					{last && <input type="button" title={options?.textLabels?.pagination?.last} className="pages__no" value='>>' disabled={currentPage === pageNo.length} onClick={() => pageNoHandler(pageCount, rowPerPage)} />}
				</div>
				<div style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor:options?.color?.borderColor }}>
					<span>{options?.textLabels?.pagination?.rowsPerPage}</span>
					<select className="per-page" value={rowPerPage} onChange={event => handleChengeRowPerPage(Number(event.target.value))}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</div>
		</>
	)
}