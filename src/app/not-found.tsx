import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-slate-200 dark:bg-gray-900 w-full h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            <span className={`text-red-600 dark:text-red-400`}>4</span>
            <span className={`text-[#010166] dark:text-blue-700`}>0</span>
            <span className={`text-red-600 dark:text-red-400`}>4</span>
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-slate-800 dark:text-slate-200 md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-slate-800 dark:text-slate-200">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <Link
            href="#"
            className="inline-flex text-slate-100 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-red-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
