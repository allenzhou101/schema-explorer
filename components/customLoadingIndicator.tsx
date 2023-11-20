import sectionHeight from "@/util/constants";

export default function CustomLoadingIndicator() {
    return <div className={`flex h-[${sectionHeight}px] items-center justify-center`}>
        <p className="text-gray-500">...</p>
    </div>;
}