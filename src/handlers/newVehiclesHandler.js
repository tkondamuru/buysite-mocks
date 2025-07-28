import newVehiclesData from '../data/UtilityVehiclesJson.json' assert { type: 'json' };

export async function handleNewVehicles(request) {
  try {
    // Process the data to add display_arg_part_no property
    const processedVehicles = newVehiclesData.map(vehicle => {
      const display_arg_part_no = vehicle.OE_Number 
        ? vehicle.arg_part_no + ' / ' + vehicle.OE_Number 
        : vehicle.arg_part_no;
      
      return {
        ...vehicle,
        display_arg_part_no
      };
    });
    
    const response = {
      success: true,
      count: processedVehicles.length,
      vehicles: processedVehicles
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
    return new Response(JSON.stringify({ error: 'Failed to retrieve new vehicles' }), {
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