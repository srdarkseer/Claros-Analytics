import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsersAsync, fetchPostsAsync, clearError } from '@/store/slices/dataSlice';
import { resetPagination } from '@/store/slices/paginationSlice';
import {
  selectIsLoading,
  selectDataError,
  selectFilteredData,
  selectPaginatedData,
} from '@/store/selectors';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, Users, FileText } from 'lucide-react';
import { DataTable } from './components/DataTable';
import { SearchFilter } from './components/SearchFilter';
import { DataPagination } from './components/DataPagination';

export default function Data() {
  const dispatch = useAppDispatch();
  const filteredData = useAppSelector(selectFilteredData);
  const paginatedData = useAppSelector(selectPaginatedData);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectDataError);

  useEffect(() => {
    // Fetch users by default
    dispatch(fetchUsersAsync());
    dispatch(resetPagination());
  }, [dispatch]);

  const handleFetchUsers = () => {
    dispatch(clearError());
    dispatch(resetPagination());
    dispatch(fetchUsersAsync());
  };

  const handleFetchPosts = () => {
    dispatch(clearError());
    dispatch(resetPagination());
    dispatch(fetchPostsAsync());
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View and manage data from the API
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={handleFetchUsers}
            disabled={isLoading}
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Users className="size-4" />}
            <span className="hidden sm:inline">Load Users</span>
            <span className="sm:hidden">Users</span>
          </Button>
          <Button
            onClick={handleFetchPosts}
            disabled={isLoading}
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FileText className="size-4" />
            )}
            <span className="hidden sm:inline">Load Posts</span>
            <span className="sm:hidden">Posts</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SearchFilter />

      {isLoading && filteredData.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm sm:text-base text-muted-foreground">Loading data...</span>
        </div>
      ) : filteredData.length > 0 ? (
        <>
          <DataTable data={paginatedData} />
          <DataPagination totalItems={filteredData.length} />
        </>
      ) : (
        <Alert>
          <AlertCircle className="size-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription className="text-sm sm:text-base">
            {filteredData.length === 0 && !isLoading
              ? 'Click one of the buttons above to load data from the API.'
              : 'No results found. Try adjusting your search query.'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
