export function NotFound() {
    return <div className="m-auto text-center h-[100vh] content-center">
        <h1 className="text-5xl font-bold text-gray-800">Sorry, this page isn't available</h1>
        <h2 className="text-3xl mt-2 text-gray-600">The link you followed may be broken, or the page may have been
            removed.</h2>
        <a href="/" className="mt-2 block link">Go back to home page.</a>
    </div>;
}
