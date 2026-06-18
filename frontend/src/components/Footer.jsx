export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between text-xs text-gray-400">
        <span>&copy; {new Date().getFullYear()} DigiMark</span>
        <span>Dibangun dengan AES-192 &middot; Steganografi EOF</span>
      </div>
    </footer>
  );
}
