"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";

type User = {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
  provider: string;
};

const Dashboard = () => {
  const defaultUsers: User[] = [];
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState<Number>(0);
  useEffect(() => {
    const toastID = toast.loading("Loading dashboard...");
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
        toast.success("Dashboard loaded", {
          id: toastID,
        });
      } catch (error) {
        setUsers(defaultUsers);
        console.error("Error fetching users:", error);
        toast.error("Failed to load dashboard", {
          id: toastID,
        });
      } finally {
        toast.dismiss(toastID);
      }
    };
    fetchUsers();
  }, [refreshing]);

  // @ts-ignore
  const isAdmin = session?.user?.role === "admin";
  // @ts-ignore
  const role = session?.user?.role || "user";
  const deleteUser = async (userId: number, email: string, role: string) => {
    console.log("Deleting user:", userId, email, role);
    const toastID = toast.loading("Deleting user...");
    if (role === "admin") {
      toast.error("You cannot delete an admin user");
      return;
    }
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success(`User ${email} deleted successfully`, {
          id: toastID,
        });
        setRefreshing(Date.now());
      } else {
        toast.error("Failed to delete user", {
          id: toastID,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", {
        id: toastID,
      });
    }
  };
  const disableUser = async (
    userId: number,
    email: string,
    isActive: boolean,
    role: string,
  ) => {
    console.log("Disabling user:", userId, email, isActive, role);
    const toastID = toast.loading(`${!isActive ? "Enabling" : "Disabling"} user...`);
    if (role === "admin") {
      toast.error("You cannot disable an admin user");
      return;
    }
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `User ${email} ${!isActive ? "disabled" : "enabled"} successfully`,
          {
            id: toastID,
          }
        );
        setRefreshing(Date.now());
      } else {
        toast.error(data.error || "Failed to update user", {
          id: toastID,
        });
      }
    } catch (error) {
      console.error("Error disabling user:", error);
      toast.error("Failed to disable user", {
        id: toastID,
      });
    }
  };
  toast.dismiss();
  return (
    <div className="w-full min-h-screen w-[95%] md:w-[80%] xl:w-[60%] mx-auto p-6 space-y-6">
      <div className="flex md:justify-between md:items-center border p-4 py-8 rounded-lg dark:bg-[oklch(0.2_0_0)] dark:border flex-col md:flex-row gap-4 justify-center items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center md:text-left">
            Welcome !
          </h1>
          <div className="flex gap-4 items-center">
            {isAdmin ? (
              <Badge variant="destructive">Admin</Badge>
            ) : (
              <Badge variant="secondary">User</Badge>
            )}
            {session?.user?.email}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <ThemeToggle />
          <Button
            variant="outline"
            className="h-[45px] w-[150px] cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div className="border rounded-md max-h-[700px] overflow-auto custom-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-[700] py-5 px-3">ID</TableHead>
              <TableHead className="font-[700] py-5">EMAIL</TableHead>
              <TableHead className="font-[700] py-5">PROVIDER</TableHead>
              <TableHead className="font-[700] py-5">ROLE</TableHead>
              <TableHead className="font-[700] py-5">STATUS</TableHead>
              {isAdmin && (
                <TableHead className="text-center font-[700] py-5">
                  ACTIONS
                </TableHead>
              )}
              {isAdmin && (
                <TableHead className="text-center font-[700] py-5">
                  DELETE
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="py-4 px-3">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.provider}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <Badge variant="default">Admin</Badge>
                  ) : (
                    <Badge variant="outline">User</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.isActive ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Disabled</Badge>
                  )}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-center">
                    <Button
                      variant={user.isActive ? "secondary" : "default"}
                      className="px-3 cursor-pointer"
                      onClick={() => {
                        disableUser(
                          user.id,
                          user.email,
                          user.isActive,
                          user.role,
                        );
                      }}
                    >
                      {user.isActive ? "Disable" : "Enable"}
                    </Button>
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      className="px-3 cursor-pointer"
                      onClick={() => {
                        deleteUser(user.id, user.email, user.role);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
