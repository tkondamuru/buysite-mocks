export async function handleCancelActiveOrder(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { loc_no, shipper_no, item_uid_no, arg_part_no } = body;

    // Validate required parameters
    if (!loc_no || !shipper_no || item_uid_no === undefined || !arg_part_no) {
      return new Response(JSON.stringify({ 
        error: 'Missing required parameters: loc_no, shipper_no, item_uid_no, arg_part_no' 
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

    // Determine response message based on item_uid_no
    let message;
    if (item_uid_no === -1) {
      message = "Cancellation Notice for the order has been sent to branch";
    } else {
      message = `Cancellation Notice for part ${arg_part_no} has been sent to branch`;
    }

    const response = {
      success: true,
      message: message,
      data: {
        loc_no,
        shipper_no,
        item_uid_no,
        arg_part_no
      }
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
      error: 'Failed to process cancellation request',
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