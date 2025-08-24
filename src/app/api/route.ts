export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    return Response.json({ message: "Hello World", searchParams });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
