export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#22c1c3] to-[#fdbb2d] flex flex-col items-center justify-center text-white">
      <section className="text-center px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Discover amazing features to boost your productivity and creativity.
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold">
          Get Started
        </button>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white rounded-full p-4 mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold">Fast Performance</h3>
          <p className="text-sm mt-2">
            Experience lightning-fast loading speeds and top-notch performance.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-white rounded-full p-4 mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h3 className="text-xl font-bold">Secure</h3>
          <p className="text-sm mt-2">
            Your data is safe with us thanks to industry-standard security.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-white rounded-full p-4 mb-4">
            <span className="text-3xl">⚙️</span>
          </div>
          <h3 className="text-xl font-bold">Easy Integration</h3>
          <p className="text-sm mt-2">
            Seamlessly integrate with other tools to maximize your efficiency.
          </p>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-200">
        <p>© 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
