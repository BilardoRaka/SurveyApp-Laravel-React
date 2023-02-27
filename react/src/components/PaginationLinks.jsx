import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationLinks({ meta, onPageClick }) {
  function onPagination(ev, link) {
    ev.preventDefault();
    if (!link.url) {
      return;
    }
    onPageClick(link);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={(ev) => onClick(ev, meta.links[0])}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={(ev) => onPagination(ev, meta.links[meta.links.length - 1])}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {meta.links?.map((link, ind) => (
              <a
                aria-current="page"
                onClick={(ev) => onPagination(ev, link)}
                key={ind}
                className={
                  "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-100" +
                  (ind === 0 ? "rounded-l-md " : "") +
                  (ind === meta.links.length - 1 ? "rounded-r-md " : "") +
                  (link.active
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "")
                }
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></a>
            ))}
            {/* <a
        
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              2
            </a> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
