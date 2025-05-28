export default function ProjectsLoading() {
  return (
    <section className="c-space my-20">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-10 bg-gray-700 rounded w-48 mb-12"></div>

        <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
          {/* Left panel skeleton */}
          <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 bg-gradient-to-b from-gray-800 to-black rounded-lg">
            <div className="flex flex-col gap-5 my-5">
              {/* Project title skeleton */}
              <div className="h-8 bg-gray-600 rounded w-3/4 mb-4"></div>

              {/* Description skeletons */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
              </div>

              {/* Subdescription skeletons */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>

            {/* Tags and link section */}
            <div className="flex items-center justify-between flex-wrap gap-5">
              {/* Technology tags skeleton */}
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gray-600 rounded-lg"
                  ></div>
                ))}
              </div>

              {/* Live site link skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
                <div className="w-3 h-3 bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* Navigation buttons skeleton */}
            <div className="flex justify-between items-center mt-7">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Right panel skeleton - 3D video screen */}
          <div className="border border-gray-700 md:h-full flex items-center justify-center bg-gradient-to-t from-gray-800 to-black rounded-lg min-h-[400px]">
            <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
              {/* Video placeholder */}
              <div className="relative w-4/5 h-4/5 bg-gray-800 rounded-lg flex items-center justify-center">
                {/* Play button skeleton */}
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-gray-400 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>

                {/* Loading dots animation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading projects...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
