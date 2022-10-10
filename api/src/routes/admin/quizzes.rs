use worker::*;

use crate::RequestContext;

pub async fn get(_req: Request, ctx: RouteContext<RequestContext>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}

pub async fn get_id(req: Request, ctx: RouteContext<RequestContext>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}

pub async fn post_id(_req: Request, ctx: RouteContext<RequestContext>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}
