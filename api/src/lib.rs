use worker::*;

mod routes;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    utils::set_panic_hook();

    let router = Router::new();

    router
        .get_async("/", routes::index::get)
        .get_async("/quiz/:id", routes::quiz::get_id)
        .run(req, env)
        .await
}
