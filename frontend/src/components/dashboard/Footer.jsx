function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Brand */}
        <h1 className="text-xl font-semibold text-white">Themovieweb</h1>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition duration-300">
            Home
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            About
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} The movie Web. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
