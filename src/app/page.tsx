import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          DeFi Model Playground
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Available Models
          </h2>

          <ul className="space-y-4">
            <li className="transition hover:bg-blue-50 p-4 rounded-md border border-gray-100 hover:border-blue-200">
              <Link href="/amm" className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-600">
                    Constant Product Model (AMM)
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Automated Market Maker based on x * y = k formula
                  </p>
                </div>
                <div className="bg-blue-500 text-white p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </li>

            <li className="transition hover:bg-purple-50 p-4 rounded-md border border-gray-100 hover:border-purple-200 opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-purple-600">
                    Lending Protocol (Coming Soon)
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Interest rate model and liquidation mechanics
                  </p>
                </div>
                <div className="bg-gray-300 text-white p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 DeFi Model Playground. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
