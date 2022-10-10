use worker::*;

use crate::RequestContext;

pub async fn post_id(_req: Request, _ctx: RouteContext<RequestContext>) -> Result<Response> {
    return Response::ok("OK");
}
