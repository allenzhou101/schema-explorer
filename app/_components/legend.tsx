export default function Legend() {
    const LegendItem = ({ label, shape, color }: any) => {
        return (
            <div className="flex items-center gap-2">
            {shape === 'square' ? (
                <div className={`h-4 w-4 ${color} border border-gray-300`}></div>
            ) : (
                <div className={`h-4 w-4 ${color} rounded-full border border-gray-300`}></div>
            )}
            <span className="text-xs text-white">{label}</span>
            </div>
        );
    };

    return (
        <div className="absolute z-10 bottom-4 right-3 bg-gray-900 p-2 bg-[#1E1E1E] rounded-md border border-[#1E1E1E] hover:border-[#494949] duration-100">
            <div className="flex flex-col space-y-1">
                <LegendItem label="Schema" shape="square" color="bg-[#66BB6A]" />
                <LegendItem label="Namespace" shape="circle" color="bg-[#0085FF]" />
                <LegendItem label="Entity" shape="circle" color="bg-[#A665EB]" />
            </div>
        </div>
    );
}