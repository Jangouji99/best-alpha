const ProductDetailsLoader = () => {
    return (
        <div className="p-2 animate-pulse md:mt-4 md-4">
            <div className="flex-auto md:flex">
                <div className="bg-gray-200 rounded mr-4 h-40 w-40"></div>
                <div className="w-full  md:w-1/2 h-80 md:h-64vh bg-gray-200 rounded mr-4"></div>
                <div className="flex-1 space-y-4 md:mt-5 mt-5">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsLoader;