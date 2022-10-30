use worker::*;

use crate::RequestData;

pub async fn post(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 401)
    }
}

pub async fn get_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 401)
    }
}

pub async fn post_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 401)
    }
}

pub async fn put_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 401)
    }
}

pub async fn delete_id(_req: Request, ctx: RouteContext<RequestData>) -> Result<Response> {
    match ctx.data.admin_key {
        Some(admin_key) => Response::ok(admin_key),
        None => Response::error("Admin key is missing from the request", 401)
    }
}
