import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@shared/schema";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} data-testid={`row-user-${u.id}`}>
              <TableCell className="font-medium">{u.email}</TableCell>
              <TableCell>{u.firstName && u.lastName ? `${u.firstName} ${u.lastName}` : '-'}</TableCell>
              <TableCell><Badge variant={u.role === 'admin' ? 'destructive' : 'secondary'}>{u.role}</Badge></TableCell>
              <TableCell>{format(new Date(u.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => onEdit(u)} data-testid={`button-edit-user-${u.id}`}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(u)} data-testid={`button-delete-user-${u.id}`}><Trash className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}