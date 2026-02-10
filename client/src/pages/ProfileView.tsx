import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Building2, MapPin, BadgeCheck } from 'lucide-react';

export default function ProfileView() {
  const params = useParams() as Record<string, string>;
  // prefer route param, fallback to parsing location
  const id = params?.id || window.location.pathname.split('/').pop();

  const { data, isLoading } = useQuery({
    queryKey: ["/profile_view", id],
    queryFn: async () => {
      // Try authenticated endpoint first (admins or self)
      try {
        const resp = await apiRequest('GET', `/api/users/${id}`);
        if (resp.ok) return await resp.json();
      } catch (err) {
        // ignore and try public
      }

      // Fallback to public endpoint
      const pub = await fetch(`/api/public/users/${id}`);
      if (!pub.ok) throw new Error('Not found');
      return await pub.json();
    },
    enabled: !!id,
  });

  if (isLoading) return null;
  if (!data) return <div className="container mx-auto px-4 py-8">User not found or unauthorized</div>;

  const { user, profile, listings, recentMessages } = data as any;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex items-center gap-4">
          <Avatar>
            {profile?.profileImageUrl ? (
              <AvatarImage src={profile.profileImageUrl} alt={user.firstName || 'User'} />
            ) : (
              <AvatarFallback>{(user.firstName || user.email || 'U').charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{user.firstName} {user.lastName}</CardTitle>
              {user.verificationStatus === 'approved' && (
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500/10 shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Email is only shown when present in payload (authenticated view) */}
            {user.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <div>{user.email}</div>
              </div>
            )}
            {profile?.phoneNumber && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <div>{profile.phoneNumber}</div>
              </div>
            )}
            {profile?.companyName && (
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                <div>{profile.companyName}</div>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <div>{profile.location}</div>
              </div>
            )}

            {/* Listings (public) */}
            {listings && listings.length > 0 && (
              <div>
                <h4 className="font-semibold">Listings</h4>
                <div className="space-y-2 mt-2">
                  {listings.map((l: any) => (
                    <div key={l.id} className="p-2 border rounded">
                      <div className="font-medium">{l.title || l.name || 'Listing'}</div>
                      <div className="text-xs text-muted-foreground">{l.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent messages preview (only present for admin or owner) */}
            {recentMessages && recentMessages.length > 0 && (
              <div>
                <h4 className="font-semibold">Recent Messages</h4>
                <div className="space-y-2 mt-2">
                  {recentMessages.map((m: any) => (
                    <div key={m.id} className="p-2 border rounded">
                      <div className="text-sm truncate">{m.content}</div>
                      <div className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
