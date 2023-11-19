import React from "react";

function Pagination() {

  return (
    <nav aria-label="Page navigation example">
      <ul class="list-style-none mb-6 flex">
        <li>
          <a href="/" class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">
            Previous
          </a>
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="/"
          >
            1
          </a>
        </li>
        <li aria-current="page">
          <a
            class="relative block rounded bg-gray-800 px-3 py-1.5 text-sm font-medium text-secondary-800 transition-all duration-300"
            href="/"
          >
            2
            <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
              (current)
            </span>
          </a>
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="/"
          >
            3
          </a>
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href="/"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
