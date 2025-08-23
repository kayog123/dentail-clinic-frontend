export async function GET(request: Request) {
  try {
    return Response.json({ message: "Hello World" });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
