import { NextRequest, NextResponse } from "next/server";
import { mockSystemUsers, SystemUser } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const roleFilter = searchParams.get("role") || "ALL";
    const statusFilter = searchParams.get("status") || "ALL";

    let filtered = [...mockSystemUsers];

    if (query) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          u.id.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "ALL") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    return NextResponse.json({
      users: filtered,
      total: filtered.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, status, role, subscription } = body as {
      userId: string;
      status?: SystemUser["status"];
      role?: SystemUser["role"];
      subscription?: SystemUser["subscription"];
    };

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const userIndex = mockSystemUsers.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (status) mockSystemUsers[userIndex].status = status;
    if (role) mockSystemUsers[userIndex].role = role;
    if (subscription) mockSystemUsers[userIndex].subscription = subscription;

    return NextResponse.json({
      message: "User updated successfully",
      user: mockSystemUsers[userIndex],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
