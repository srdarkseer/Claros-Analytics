import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DataItem } from '@/store/slices/dataSlice';
import type { User, Post } from '@/types/api';

interface DataTableProps {
  data: DataItem[];
}

function isUser(item: DataItem): item is User {
  return 'email' in item && 'username' in item;
}

// Mobile card view for users
function UserCard({ user }: { user: User }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID:</span>
          <span className="font-medium">{user.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Username:</span>
          <span className="font-medium">{user.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium break-all">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone:</span>
          <span className="font-medium">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">City:</span>
          <span className="font-medium">{user.address.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Website:</span>
          <span className="font-medium break-all">{user.website}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Mobile card view for posts
function PostCard({ post }: { post: Post }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID:</span>
          <span className="font-medium">{post.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">User ID:</span>
          <span className="font-medium">{post.userId}</span>
        </div>
        <div className="pt-2">
          <span className="text-muted-foreground">Body:</span>
          <p className="mt-1 text-sm line-clamp-3">{post.body}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No data available</div>;
  }

  // Check if we're displaying users or posts
  const isUserData = isUser(data[0]);

  // Mobile card view
  const mobileView = (
    <div className="block sm:hidden">
      {data.map(item => {
        if (isUserData) {
          return <UserCard key={item.id} user={item as User} />;
        }
        return <PostCard key={item.id} post={item as Post} />;
      })}
    </div>
  );

  // Desktop table view
  const desktopView = (
    <div className="hidden sm:block rounded-md border overflow-x-auto">
      <Table data-testid="data-table">
        {isUserData ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Website</TableHead>
                <TableHead className="hidden lg:table-cell">City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => {
                const user = item as User;
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[100px] truncate">
                      {user.website}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.address.city}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Body</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => {
                const post = item as Post;
                return (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.id}</TableCell>
                    <TableCell>{post.userId}</TableCell>
                    <TableCell className="max-w-xs truncate">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-md truncate">
                      {post.body}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );

  return (
    <div data-testid="data-container">
      {mobileView}
      {desktopView}
    </div>
  );
}
