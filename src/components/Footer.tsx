export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 px-6 text-center">
      <div className="max-w-7xl mx-auto ">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="/about" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            About
          </a>
          <a href="/terms" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            Terms
          </a>
          <a href="/privacy" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            Privacy
          </a>
          <a href="/contact" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}