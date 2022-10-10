use worker::*;

use crate::RequestContext;

pub async fn get_id(_req: Request, ctx: RouteContext<RequestContext>) -> Result<Response> {
    if let Some(id) = ctx.param("id") {
        console_log!("id: {}", id);
        return Response::ok("Ok");
    }

    return Response::ok("Id not specified");
}
