import { NextRequest, NextResponse } from "next/server";
import { mockClinicianNotes, ClinicianNote } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId") || "child_01";

    const note = mockClinicianNotes[childId] || {
      id: `cn_${childId}`,
      childId,
      childName: childId === "child_01" ? "Aarav Sharma" : childId === "p2" ? "Leo Sinclair" : "Maya Patel",
      doctorName: "Dr. Sarah Jenkins",
      note: "No clinician notes registered yet.",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ note });
  } catch (error) {
    console.error("Error fetching clinician notes:", error);
    return NextResponse.json({ error: "Failed to fetch clinician notes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { childId, childName, doctorName, note } = body as {
      childId: string;
      childName?: string;
      doctorName?: string;
      note: string;
    };

    if (!childId || !note) {
      return NextResponse.json({ error: "childId and note are required" }, { status: 400 });
    }

    const updatedNote: ClinicianNote = {
      id: mockClinicianNotes[childId]?.id || `cn_${Date.now().toString().slice(-4)}`,
      childId,
      childName: childName || mockClinicianNotes[childId]?.childName || "Child Patient",
      doctorName: doctorName || "Dr. Sarah Jenkins",
      note,
      updatedAt: new Date().toISOString(),
    };

    mockClinicianNotes[childId] = updatedNote;

    return NextResponse.json({
      success: true,
      message: "Clinician note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error saving clinician notes:", error);
    return NextResponse.json({ error: "Failed to save clinician note" }, { status: 500 });
  }
}
