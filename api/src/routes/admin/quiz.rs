use worker::*;

pub async fn get(_req: Request, ctx: RouteContext<()>) -> Result<Response> {
    let kv = ctx.kv("POLLUS")?;
    kv.put("timestamp", Date::now().to_string())?.execute().await?;
    return Response::ok("OK");
}
 