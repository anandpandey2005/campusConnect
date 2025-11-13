export default function Notice({ Notice }) {
  return (
    <a
      href={Notice?.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full px-5 py-2 border-2 rounded-xl hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold line-clamp-1">{Notice?.title || 'Untitled Notice'}</h2>
      <p className="text-gray-600 mt-1 text-sm line-clamp-3">
        {Notice?.description || 'No description available.'}
      </p>
    </a>
  );
}
