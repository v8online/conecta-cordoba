export async function GET() {
  return Response.json({ 
    status: "OK",
    message: "Health check working",
    timestamp: new Date().toISOString()
  });
}