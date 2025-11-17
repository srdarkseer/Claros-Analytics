import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery, clearFilters } from '@/store/slices/filterSlice';
import { selectSearchQuery } from '@/store/selectors';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function SearchFilter() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    dispatch(clearFilters());
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="search" className="text-sm font-medium">
        Search
      </Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="search"
          type="text"
          placeholder="Search by name, email, username, or any field..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
