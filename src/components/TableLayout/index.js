import React, { useEffect, useState } from "react";
import "./style.css";
import "./bootstrap.min.css";
// import { Loader } from "rsuite";
import {
  AngleDown,
  AngleUp,
  arrowLeft,
  arrowRight,
  chevronLeft,
  chevronRight,
} from "../../assets/svgIcons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const TableLayout = ({ headers, data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paginatedData, setPaginatedData] = useState([]);
  const [originalData, setOriginalData] = useState(data);
  const [page, setPage] = useState(1);
  const [pageTwo, setPageTwo] = useSearchParams(
    { q: 1 },
    { replace: true, state: location?.state }
  );
  const [pagesNumber, setPagesNumber] = useState();
  const [searchQuery, setSearchQuery] = useState({});
  const [sortQuery, setSortQuery] = useState({});
  const [number, setNumber] = useState(10);
  
  useEffect(() => {
    setOriginalData(data);
  }, [data]);


  // useEffect(() => {
  //   if (
  //     data &&
  //     data?.length &&
  //     Array?.isArray(data) &&
  //     originalData &&
  //     originalData?.length &&
  //     Array.isArray(originalData)
  //   ) {
  //     setPagesNumber(Math.ceil(originalData?.length / number));

  //     setPaginatedData(
  //       originalData?.filter(
  //         (item, index) =>
  //           index >= (parseInt(pageTwo.get("q")) - 1) * number &&
  //           index <= parseInt(pageTwo.get("q")) * number
  //       )
  //     );
  //   } else {
  //     setPaginatedData([]);
  //   }
  // }, [pageTwo, originalData, number, data]);

  // useEffect(() => {
  //   setPageTwo({ q: 1 }, { replace: true, state: location?.state });
  // }, [number]);
  // useEffect(() => {
  //   searchFunction();
  // }, [searchQuery]);
  // useEffect(() => {
  //   if (sortQuery.type == "asc") {
  //     sortAscFunction();
  //   } else if (sortQuery.type == "dsc") {
  //     sortDscFunction();
  //   }
  // }, [sortQuery]);

  const getPageButtons = () => {
    if (pagesNumber <= 5) {
      return Array.from({ length: pagesNumber }, (_, i) => i + 1);
    } else if (parseInt(pageTwo.get("q")) <= 3) {
      return [1, 2, 3, "...", pagesNumber];
    } else if (parseInt(pageTwo.get("q")) > pagesNumber - 2) {
      return [1, "...", pagesNumber - 2, pagesNumber - 1, pagesNumber];
    } else {
      return [
        1,
        "...",
        parseInt(pageTwo.get("q")) - 1,
        parseInt(pageTwo.get("q")),
        parseInt(pageTwo.get("q")) + 1,
        "...",
        pagesNumber,
      ];
    }
  };
  const searchFunction = () => {
    if (searchQuery?.value && searchQuery?.value?.length) {
      let arr = [];
      let uniqueItems = new Set(); // Use a Set to keep track of unique items

      data?.forEach((item) => {
        if (
          item[searchQuery?.dataIndex] &&
          item[searchQuery?.dataIndex]?.length
        ) {
          if (searchQuery?.equal) {
            if (
              item[searchQuery?.dataIndex] === searchQuery?.value &&
              !uniqueItems.has(item)
            ) {
              arr.push(item);
              return uniqueItems.add(item);
            } else {
              setOriginalData([]);
            }
          } else {
            if (
              item[searchQuery?.dataIndex]?.includes(searchQuery?.value) &&
              !uniqueItems.has(item)
            ) {
              arr.push(item);
              return uniqueItems.add(item);
            }
          }
        } else {
          setOriginalData([]);
        }
      });
      setOriginalData([...arr]);
      if (arr?.length) {
        setPageTwo(
          {
            q: 1,
          },
          { replace: true, state: location?.state }
        );
      } else {
        setOriginalData([]);
      }
    } else {
      setOriginalData(data);
    }
  };
  const sortAscFunction = () => {
    if (sortQuery?.dataIndex && sortQuery?.dataIndex?.length) {
      // alert("Sorted ASC");
      setOriginalData((prevData) => {
        return [...prevData].sort((a, b) => {
          return !isNaN(a[sortQuery?.dataIndex]) &&
            !isNaN(b[sortQuery?.dataIndex])
            ? parseInt(b[sortQuery?.dataIndex]) -
                parseInt(a[sortQuery?.dataIndex])
            : b[sortQuery?.dataIndex]?.localeCompare(a[sortQuery?.dataIndex]);
        });
      });
    }
  };
  const sortDscFunction = () => {
    if (sortQuery?.dataIndex && sortQuery?.dataIndex?.length) {
      // alert("Sorted DSC");
      setOriginalData((prevData) => {
        return [...prevData].sort((a, b) => {
          return !isNaN(a[sortQuery?.dataIndex]) &&
            !isNaN(b[sortQuery?.dataIndex])
            ? parseInt(a[sortQuery?.dataIndex]) -
                parseInt(b[sortQuery?.dataIndex])
            : a[sortQuery?.dataIndex]?.localeCompare(b[sortQuery?.dataIndex]);
        });
      });
    }
  };

  return (
    <>
      <div className="table">
        <table>
          <thead className="tableRow">
            {headers.map((header, index) =>
              header?.label && header?.label?.length ? (
                <th className="tableHeader" key={index}>
                  <span
                    style={{ cursor: header?.sort ? "pointer" : "initial" }}
                    className="filters"
                  >
                    {" "}
                    <span> {header?.label}</span>
                  </span>
                  <div className="sorts">
                    {header?.search ? (
                      <input
                        type="search"
                        onKeyUp={(e) => {
                          setSearchQuery({
                            ...searchQuery,
                            dataIndex: header.dataIndex,
                            value: e.target.value,
                            equal: header?.equal,
                          });
                        }}
                        onChange={(e) => {
                          setSearchQuery({
                            ...searchQuery,
                            dataIndex: header.dataIndex,
                            value: e.target.value,
                            equal: header?.equal,
                          });
                        }}
                      />
                    ) : null}
                    <span
                      onClick={() => {
                        if (header?.sort) {
                          if (header.asc) {
                            setSortQuery({
                              dataIndex: header?.dataIndex,
                              type: "dsc",
                            });
                            header.asc = false;
                          } else {
                            setSortQuery({
                              dataIndex: header?.dataIndex,
                              type: "asc",
                            });
                            header.asc = true;
                          }
                        }
                      }}
                    >
                      {" "}
                      {header?.asc && header?.sort
                        ? AngleDown
                        : !header?.asc && header?.sort
                        ? AngleUp
                        : null}
                    </span>
                  </div>
                </th>
              ) : null
            )}
          </thead>
          <tbody className="tableRow tableBody">
            {!data ? (
              "..."
            ) : data?.length && Array?.isArray(data) ? (
              paginatedData?.map((row, index) => (
                <tr className="body" key={index}>
                  {headers?.map((column, columnIndex) => {
                    const dataIndex = column?.dataIndex;
                    const cellData = row[dataIndex];
                    if (column && column?.label && column?.label?.length)
                      return (
                        <td className="tableCell" key={columnIndex}>
                          {column?.type === "children" ? (
                            <>
                              {column?.children({
                                headers: column,
                                row: row,
                                index: index,
                                lastIndex: paginatedData?.length,
                              })}
                            </>
                          ) : (
                            cellData
                          )}
                        </td>
                      );
                  })}
                </tr>
              ))
            ) : (
              <h4>لا يوجد بيانات</h4>
            )}
          </tbody>
        </table>
        <hr />
      </div>

      {/* <div className="pagination">
        <div>
          <p>عدد العناصر بالصفحة: </p>
          <select
            name="rowNumbers"
            id="rowNumbers"
            onChange={(e) => setNumber(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="350">350</option>
            <option value="400">400</option>
            <option value="450">450</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        {data && data?.length && Array?.isArray(data) ? (
          <p>
            <button
              className="btn"
              onClick={() =>
                setPageTwo(
                  {
                    q:
                      pageTwo.get("q") > 1
                        ? parseInt(pageTwo.get("q")) - 1
                        : pageTwo.get("q"),
                  },
                  { replace: true, state: location?.state }
                )
              }
            >
              {chevronRight}
            </button>

            {getPageButtons().map((button, index) => (
              <button
                className={
                  button == parseInt(pageTwo.get("q"))
                    ? "btn btn-primary paginated"
                    : "btn paginated"
                }
                key={index}
                onClick={() =>
                  button == "..."
                    ? null
                    : setPageTwo(
                        {
                          q: button,
                        },
                        { replace: true, state: location?.state }
                      )
                }
              >
                {button}
              </button>
            ))}

            <button
              className="btn"
              onClick={() => {
                setPageTwo(
                  {
                    q:
                      pageTwo.get("q") < pagesNumber
                        ? parseInt(pageTwo.get("q")) + 1
                        : pageTwo.get("q"),
                  },
                  { replace: true, state: location?.state }
                );
              }}
            >
              {chevronLeft}
            </button>
          </p>
        ) : null}
      </div> */}
    </>
  );
};

export default TableLayout;
