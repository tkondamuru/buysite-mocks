import historyData from '../data/history.json' assert { type: 'json' };

export async function handleHistory(request) {
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
    const body = await request.json();
    const { shipperno, pono, start_date, end_date, item_pono } = body;
    
    // For mock data, we'll return all history data regardless of the POST attributes
    // In a real implementation, you would filter based on these parameters
    
    const response = {
      success: true,
      shipTono: shipTono,
      searchCriteria: {
        shipperno: shipperno || null,
        pono: pono || null,
        start_date: start_date || null,
        end_date: end_date || null,
        item_pono: item_pono || null
      },
      count: historyData.length,
      history: historyData
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
    return new Response(JSON.stringify({ error: 'Invalid JSON body or failed to retrieve history' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
} 