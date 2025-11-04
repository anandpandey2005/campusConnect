import React from 'react';

export default function LostFoundProduct({ product = { product } }) {
  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown Date';

  return (
    <div className="w-[300px] flex flex-col gap-3 p-4 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-linear-to-br from-gray-900 to-black flex items-center justify-center group shadow-sm grayscale-0 hover:grayscale-100">
        {product.image ? (
          <img
            src={product.image || '/nocontent.png'}
            alt={product.title || 'N/A'}
            className="w-full h-full object-cover   transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <p className="text-gray-400 text-sm">No Image Available</p>
        )}

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>

        <div
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm 
       ${product.status === 'open' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}
        >
          {product.status === 'open' ? 'Open' : 'Closed'}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <p className="font-semibold text-base text-gray-900">{product.title || 'N/A'}</p>
        <p className="text-gray-600 line-clamp-3">{product.description || 'N/A'}</p>

        <div className="flex justify-between text-xs text-gray-500">
          <strong>
            <span>{product.venue || 'N/A'}</span>
          </strong>
          <span>
            {product.dateTime
              ? new Date(product.dateTime).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Unknown Time'}
          </span>
        </div>

        <div className="w-full border rounded-lg p-2 bg-gray-50 hover:bg-gray-200 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-800">Created by</p>

            <p className="text-[10px] text-gray-500">{formattedDate}</p>
          </div>
          <hr className="border-amber-300 mb-2" />
          <div className="text-xs space-y-0.5">
            <p>
              <strong>Name:</strong> {product.createdBy?.name || 'N/A'}
            </p>
            <p>
              <strong>Course:</strong> {product.createdBy?.course || 'N/A'}
            </p>
            <p>
              <strong>Branch:</strong> {product.branch || 'N/A'}
            </p>
            <p>
              <a
                href={`tel:${product.contact || '875098767'}`}
                className="text-blue-600 hover:underline hover:text-blue-800 transition duration-150"
              >
                <strong>Contact:</strong> {product.contact || 'N/A'}
              </a>
            </p>
          </div>
        </div>

        <p className="text-xs">
          <strong>Handover:</strong> {product.handoverTo || 'N/A'}
        </p>
        <p className="text-xs">
          <strong>Tags:</strong>{' '}
          {Array.isArray(product.tag) ? product.tag.join(', ') : product.tags || 'N/A'}
        </p>
      </div>
    </div>
  );
}
