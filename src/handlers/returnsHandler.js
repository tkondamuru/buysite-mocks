import returnsData from '../data/returns.json' assert { type: 'json' };

export async function handleReturns(request) {
  const shipTono = request.params?.shipTono;
  
  if (!shipTono) {
    return new Response(JSON.stringify({ error: 'ShipTono parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    // Filter returns by shipTono
    const filteredReturns = returnsData.filter(returnItem => 
      returnItem.shipToNumber.toString() === shipTono.toString()
    );

    const response = {
      success: true,
      shipTono: shipTono,
      count: filteredReturns.length,
      returns: filteredReturns
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve returns' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
} 