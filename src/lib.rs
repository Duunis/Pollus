use worker::*;

mod utils;

fn get_index(_req: Request, _ctx: RouteContext<()>) -> Result<Response> {
    console_log!("BIGGUS POLLUS");
    return Response::ok("Hello");
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    utils::set_panic_hook();

    let router = Router::new();

    router
        .get("/", get_index)
        .run(req, env)
        .await        
}
