use worker::*;

mod routes;
mod utils;

pub struct RequestData {
    admin_key: Option<String>,
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    utils::set_panic_hook();

    let router = Router::with_data(RequestData {
        admin_key: req.headers().get("Authorization").unwrap()
    });

    router
        .get_async("/quizzes/:quiz_id", routes::quizzes::index::get_id)

        .post_async("/quizzes/:quiz_id/submissions", routes::quizzes::submissions::post)

        .post_async("/admin/quizzes", routes::admin::quizzes::index::post)

        .get_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::index::get_id)
        .post_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::index::post_id)
        .put_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::index::put_id)
        .delete_async("/admin/quizzes/:quiz_id", routes::admin::quizzes::index::delete_id)

        .get_async("/admin/quizzes/:quiz_id/submissions", routes::admin::quizzes::submissions::get)
        
        .get_async("/admin/quizzes/:quiz_id/submissions/:submission_id", routes::admin::quizzes::submissions::get_id)
        .delete_async("/admin/quizzes/:quiz_id/submissions/:submission_id", routes::admin::quizzes::submissions::delete_id)
        
        .run(req, env)
        .await
}
