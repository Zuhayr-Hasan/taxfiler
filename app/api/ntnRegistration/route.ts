export async function GET() {
  return new Response(JSON.stringify({ message: 'NTN Registration API placeholder' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
