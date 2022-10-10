use worker::*;

use crate::RequestData;

pub async fn get(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}

pub async fn get_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}

pub async fn delete_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 400)
    }
}
