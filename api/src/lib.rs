use worker::*;

mod routes;
mod utils;

pub struct RequestContext {
    admin_key: Option<String>,
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    utils::set_panic_hook();

    let context = RequestContext {
        admin_key: req.headers().get("Authorization").unwrap()
    };

    let router = Router::with_data(context);

    router
        .get_async("/quizzes/:quiz_id", routes::quizzes::index::get_id)
        .post_async("/quizzes/:quiz_id/submissions/:submission_id", routes::quizzes::submissions::post_id)
        .get_async("/admin/quizzes", routes::admin::quizzes::get)
        .get_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::get_id)
        .post_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::post_id)
        .run(req, env)
        .await
}
