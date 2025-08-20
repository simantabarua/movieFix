import WatchListCard from "../components/WatchListCard";
import { useAppSelector } from "../redux/hook";

export default function WatchListPage() {
  const watchListIds = useAppSelector((state) => state.watchList.watchList);

  if (!watchListIds.length)
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-gray-400 text-center text-lg font-medium">
          Your watch list is empty.
        </p>
      </div>
    );

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-black/95 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-3">
        {watchListIds.map((id) => (
          <WatchListCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
