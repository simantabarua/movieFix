export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute text-white text-sm font-medium">
          Loading...
        </span>
      </div>
    </div>
  );
}
