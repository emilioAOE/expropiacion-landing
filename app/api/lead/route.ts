import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nombre, telefono, email, comuna, tipoPropiedad, etapaProceso } = body;

    if (!nombre || !telefono || !email || !comuna || !tipoPropiedad || !etapaProceso) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Log the lead for now — connect to DB or email service later
    console.log("New lead received:", {
      nombre,
      telefono,
      email,
      comuna,
      tipoPropiedad,
      etapaProceso,
      descripcion: body.descripcion || "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
