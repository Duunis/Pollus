use worker::*;

use crate::RequestData;

pub async fn get_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    if let Some(id) = ctx.param("quiz_id") {
        console_log!("id: {}", id);
        return Response::ok("Ok");
    }

    return Response::ok("Id not specified");
}
