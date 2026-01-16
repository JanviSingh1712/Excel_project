import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="bg-white shadow p-6 rounded-lg">
          <p className="text-gray-700 mb-3">Welcome! Choose your action:</p>

          <div className="space-x-4">
            <a
              href="/process-file"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            >
              Process File
            </a>

            <a
              href="/history"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
            >
              View History
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
