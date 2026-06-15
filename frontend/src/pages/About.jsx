export default function About() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About This Project</h1>
        <p className="text-sm text-gray-500 mt-1">
          Combining AES encryption and EOF steganography to protect digital image copyrights.
        </p>
      </div>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">AES Encryption</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Advanced Encryption Standard (AES) is a symmetric encryption algorithm used worldwide
          to secure sensitive data. It encrypts copyright information using a secret key provided
          by the user, ensuring that only someone with the correct key can read the embedded data.
        </p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">EOF Steganography</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          End-of-File (EOF) steganography works by appending data after a file's logical end.
          Image viewers ignore data past the expected end of the file, so the visual appearance
          remains unchanged. This technique allows encrypted copyright data to be hidden inside
          standard JPEG and PNG images without perceptible difference.
        </p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">How It Works</h2>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 leading-relaxed">
          <li>Your copyright information (owner name, ID, description) is converted to JSON.</li>
          <li>The JSON data is encrypted using AES with your secret key.</li>
          <li>The encrypted ciphertext is appended to the end of the image file.</li>
          <li>To verify, the appended data is extracted and decrypted using the same key.</li>
        </ol>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-semibold text-gray-900">Limitations</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 leading-relaxed">
          <li>Image recompression may remove the embedded data.</li>
          <li>File size increases by the amount of appended data (typically a few hundred bytes).</li>
          <li>Extreme file manipulation can destroy the hidden data.</li>
        </ul>
      </section>
    </div>
  );
}
