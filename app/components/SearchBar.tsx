'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('city') || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = searchValue.trim();
    if (city) {
      router.push(`/?city=${encodeURIComponent(city)}`);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-4 text-gray-400 text-xl" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <FiX className="text-xl" />
          </button>
        )}
      </div>
    </form>
  );
}

