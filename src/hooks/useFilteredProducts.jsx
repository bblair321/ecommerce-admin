import { useState, useMemo } from 'react';

export function useFilteredProducts(products, searchTerm) {
  const [search, setSearch] = useState(searchTerm || '');

  const filtered = useMemo(() => {
    if (!search) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return { filtered, search, setSearch };
}
