use worker::*;

use crate::RequestData;

pub async fn post(_req: Request, _ctx: RouteContext<RequestData>) -> Result<Response> {
    return Response::ok("OK");
}
