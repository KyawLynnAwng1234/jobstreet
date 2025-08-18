import React from "react";

export default function JobSearch() {
  return (
    <>
      {/* Hero Search */}
      <section className="bg-blue-custom py-8 mb-6">
        <div className="w-full px-4 h-[300px]">
          {/* Center contents both vertically and horizontally */}
          <div className="h-full w-full flex items-center justify-center md:relative">
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full container px-4">
              {/* Keyword input (3 cols) */}
              <div className="md:col-span-3 w-full ">
                <input
                  type="text"
                  placeholder="Enter keywords"
                  className="p-3 h-[60px] border border-[#999] rounded-md bg-[#ffffffcf] text-lg w-full blue-placeholder"
                />
                <p className="absolute top-20 text-[#ffffffcf] text-xl hidden md:block">
                  What
                </p>
              </div>

              {/* Location input (2 cols) */}
              <div className="md:col-span-2 w-full">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="p-3 h-[60px] border border-[#999] rounded-md bg-[#ffffffcf] text-lg w-full blue-placeholder"
                />
                <p className="absolute top-20 text-[#ffffffcf] text-xl hidden md:block">
                  Where
                </p>
              </div>

              {/* Job Search Button (1 col) */}
              <div className="md:col-span-1 w-full">
                <button className="h-[60px] w-full px-5 rounded-md text-lg bg-[#C46210] text-[#ffffffcf] font-semibold hover:bg-[#AB4812] transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Count and Filter */}
      <div className="container mx-auto pt-8 px-4 grid md:grid-cols-3 gap-6">
        <div className="col-span-1 flex justify-between items-center">
          <span className="border px-3 py-1 rounded-full text-sm">
            100 jobs
          </span>
          <button>
            <span className="text-2xl font-bold">⇵</span>
          </button>
        </div>
      </div>

      {/* Job List and Detail View */}
      <div className="container mx-auto mt-4 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job List */}
        <div className="md:col-span-1 space-y-4 h-[1000px] overflow-y-auto pr-3">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Project Manager</h3>
                  <p className="text-sm text-gray-500">Time management</p>
                  <p className="text-sm mt-2">Mraku U</p>
                  <ul className="text-xs mt-2 space-y-1">
                    <li>Increased Productivity and Efficiency</li>
                    <li>Better Work-Life Balance</li>
                    <li>Reduced Procrastination</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-2">2d ago</p>
                </div>
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="md:col-span-2 border rounded-lg p-4 flex flex-col items-center justify-center h-[1000px] overflow-auto">
          <h4 className="font-semibold text-lg">Choose a job you like</h4>
          <p className="text-sm text-gray-500 mt-2">Detail here</p>
          <div className="mt-6">
            <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 1.1-.9 2-2 2H9m0-4h1c1.1 0 2 .9 2 2zM16 7v6m0 4h.01"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 flex justify-start mt-4 mb-8 space-x-2">
        <button className="w-8 h-8 text-gray-600">1</button>
        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-md">
          2
        </button>
        <button className="w-8 h-8 text-gray-600">3</button>
        <button className="w-8 h-8 text-gray-600">Next</button>
      </div>
    </>
  );
}
