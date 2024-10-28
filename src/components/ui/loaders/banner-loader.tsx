// components/ui/loaders/banner-loader.tsx

export default function BannerLoader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-44 md:h-430px bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-44 md:h-430px  bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
    );
}
