import { SkeletonCard } from "@/components/SkeletonCard";

const LoadingPage = () => {
    return (<div className="flex flex-col w-full justify-center items-center gap-4">
        
        
        <SkeletonCard />
        <SkeletonCard />
        
    </div> );
}
 
export default LoadingPage;