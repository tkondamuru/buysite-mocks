import favoritesData from '../data/favorites.json' assert { type: 'json' };

export async function handleFavorites(request) {
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
    // Return all favorites data for mock purposes
    
    const response = {
      success: true,
      shipTono: shipTono,
      count: favoritesData.length,
      favorites: favoritesData
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
    return new Response(JSON.stringify({ error: 'Failed to retrieve favorites' }), {
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

export async function handleUpdateFavorites(request) {
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
    // Parse the request body
    const body = await request.json();
    const { item_Uid_No } = body;

    // Validate required parameters
    if (item_Uid_No === undefined) {
      return new Response(JSON.stringify({ 
        error: 'Missing required parameter: item_Uid_No' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // Mock response for add/remove favorites
    const action = item_Uid_No ? 'added to' : 'removed from';
    
    const response = {
      success: true,
      message: `Item ${action} favorites successfully`,
      shipTono: shipTono,
      item_Uid_No: item_Uid_No
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
    return new Response(JSON.stringify({ 
      error: 'Failed to update favorites',
      details: error.message 
    }), {
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