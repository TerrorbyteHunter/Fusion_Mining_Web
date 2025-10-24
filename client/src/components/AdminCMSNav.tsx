import { Link } from "wouter";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export function AdminCMSNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link href="/admin/contact-settings">
        <Card className="hover-elevate cursor-pointer transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Contact Settings</CardTitle>
                <CardDescription>
                  Edit company contact information, address, and business hours
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}