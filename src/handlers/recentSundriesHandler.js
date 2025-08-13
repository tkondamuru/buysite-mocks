import recentSundriesData from '../data/recent-sundries.json' assert { type: 'json' };

export async function handleRecentSundries(request) {
  try {
    // Return all recent sundries data for mock purposes
    
    const response = {
      success: true,
      count: recentSundriesData.length,
      sundries: recentSundriesData
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
    return new Response(JSON.stringify({ error: 'Failed to retrieve recent sundries' }), {
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