import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Excel Automation & Formula Processor
        </h1>

        <p className="text-gray-700 text-lg max-w-xl mb-6">
          Upload your Excel or CSV files, apply formulas like VLOOKUP, SUM,
          COUNTIF, and download processed results instantly — all online!
        </p>

        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Get Started →
        </a>
      </div>
    </>
  );
}
