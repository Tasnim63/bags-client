import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import useProducts from "../../Hooks/useProducts";
import TableRow from "./TableRow";
import { Zoom } from "react-reveal";
import Loading from "../Shared/Loading/Loading";

const ManageInventories = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    const url = `https://bagsqhike.herokuapp.com/products?limit=${limit}&pageNumber=${pageNumber}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setPages(Math.ceil(data.count / limit));
        setIsLoading(false);
        setIsPageLoading(false);
      });
  }, [limit, pageNumber]);

  const handleDelete = (id, confirmation) => {
    const url = `https://bagsqhike.herokuapp.com/inventory/${id}`;
    if (confirmation) {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          const remainingProducts = products.filter(
            (product) => product._id !== id
          );
          setProducts(remainingProducts);
          toast("Item Deletation Complete");
        });
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="px-[10%] my-[2%]">
        <h2 className="text-center my-3">All Inventories</h2>
        <Zoom bottom>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {isPageLoading ? (
              <div className="mx-auto">
                <Loading />
              </div>
            ) : (
              <>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-8 py-3  border-x text-center"
                      >
                        Product Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  border-x text-center"
                      >
                        Product name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  border-x text-center"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  border-x text-center"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  border-x text-center"
                      >
                        Supplier
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  border-x text-center"
                      >
                        <span className="sr-only">Control</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <TableRow
                        key={product._id}
                        product={product}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </Zoom>
        <div
          aria-label="Page navigation example"
          className="my-6 w-full flex justify-center font-xs  lg:justify-end items-center"
        >
          <ul className="inline-flex -space-x-px full">
            <li>
              <span
                onClick={() => {
                  if (pageNumber > 0) {
                    setPageNumber(pageNumber - 1);
                  }
                }}
                className="px-2 py-0.5 lg:py-2 lg:px-3 ml-0 cursor-pointer leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="mr-2 hidden lg:inline"
                />{" "}
                Previous
              </span>
            </li>
            {[...Array(pages).keys()].map((page) => (
              <li key={page}>
                <span
                  className={`px-2 py-0.5 lg:py-2 lg:px-3.5 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    pageNumber === page ? "text-gray-700 bg-gray-200" : ""
                  }`}
                  onClick={() => setPageNumber(page)}
                >
                  {page + 1}
                </span>
              </li>
            ))}
            <li>
              <span
                onClick={() => {
                  if (pageNumber + 1 < pages) {
                    setPageNumber(pageNumber + 1);
                  }
                }}
                className="px-2 py-0.5 lg:py-2 lg:px-3 leading-tight cursor-pointer text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next{" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="ml-2 hidden lg:inline"
                />
              </span>
            </li>
          </ul>
          <select
            defaultValue={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              setPageNumber(0);
            }}
            className="hidden lg:block px-1.5  lg:py-2 lg:px-3 rounded-lg leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="my-5 mx-auto mb-12">
        <Link
          to="/addinventory"
          className="bg-blue-300 py-2 px-10 rounded-full font-semibold text-gray-600"
        >
          Add Inventory <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </div>
  );
};

export default ManageInventories;
