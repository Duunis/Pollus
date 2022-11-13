open System.Net.Http
open System.Text.Json

let url = "https://16-backend-implement-data-st.pollus.pages.dev"

let quiz = 
    {| title = "Test Quiz"
       questions = [
            {| text = "What is 2 + 5"
               choices = [
                    {| text = "5"
                       isCorrect = false |}
                    {| text = "7"
                       isCorrect = true |}
                    {| text = "11"
                       isCorrect = false |}
                    {| text = "-5"
                       isCorrect = false |}
               ] |}
       ] |}

let client = new HttpClient()

[<RequireQualifiedAccess>]
module Async =
   let map (ab: 'a -> Async<'b>) (a: Async<'a>): Async<'b> =
      async {
         let! a' = a
         let! b = ab a'
         return b
      }

   let chainFirst (ab: 'a -> Async<'b>) (a: Async<'a>): Async<'a> =
      async {
         let! a' = a
         let! _ = ab a'
         return a'
      }
   
[<RequireQualifiedAccess>]
module Identity =
   let chainFirst (ab: 'a -> 'b) (a: 'a): 'a =
      ab a |> ignore
      a

[<RequireQualifiedAccess>]
module JsonElement =
   let getProperty (name: string) (element: JsonElement) =
      element.GetProperty(name)

   let getArray (element: JsonElement) =
      element.EnumerateArray() |> seq

   let getString (element: JsonElement) =
      element.GetString()

[<RequireQualifiedAccess>]
module Seq =
   let randomElement seq =
      let length = Seq.length seq
      let index = System.Random.Shared.Next(0, length)
      let element = Seq.item index seq
      element

let createQuiz quiz =
   task {
      let json = JsonSerializer.Serialize(quiz)
      let content = new StringContent(json)
      let! response = client.PostAsync($"{url}/api/quizzes", content)
      let! json = response.Content.ReadAsStringAsync()
      let element = JsonSerializer.Deserialize<JsonElement>(json)
      return element
   } |> Async.AwaitTask

let getQuiz (quiz: JsonElement) =
   task {
      let id = quiz.GetProperty("id").GetString()
      let! response = client.GetAsync($"{url}/api/quizzes/{id}")
      let! json = response.Content.ReadAsStringAsync()
      let element = JsonSerializer.Deserialize<JsonElement>(json)
      return element
   } |> Async.AwaitTask

let createSubmission (quiz: JsonElement) =
   task {
      let submission = 
         quiz
         |> JsonElement.getProperty "questions"
         |> JsonElement.getArray
         |> Seq.map (fun question ->
            question
            |> JsonElement.getProperty "choices"
            |> JsonElement.getArray
            |> Seq.randomElement
            |> (fun choice -> 
               {| questionId = 
                     question 
                     |> JsonElement.getProperty "id"
                     |> JsonElement.getString
                  choiceId =
                     choice
                     |> JsonElement.getProperty "id"
                     |> JsonElement.getString |}))
      let json = JsonSerializer.Serialize(submission)
      let content = new StringContent(json)
      let id = quiz |> JsonElement.getProperty "id" |> JsonElement.getString
      let! response = client.PostAsync($"{url}/api/quizzes/{id}/submissions", content)
      response.EnsureSuccessStatusCode() |> ignore
   } |> Async.AwaitTask

let getSubmissions (quiz: JsonElement) =
   task {
      let id = quiz |> JsonElement.getProperty "id" |> JsonElement.getString
      let secret = quiz |> JsonElement.getProperty "secret" |> JsonElement.getString
      client.DefaultRequestHeaders.Add("Authorization", secret)
      let! response = client.GetAsync($"{url}/api/quizzes/{id}/submissions")
      client.DefaultRequestHeaders.Clear()
      let! json = response.Content.ReadAsStringAsync()
      let element = JsonSerializer.Deserialize<JsonElement>(json)
      return element
   } |> Async.AwaitTask

quiz
|> createQuiz
|> Async.chainFirst getQuiz
|> Async.chainFirst createSubmission
|> Async.map getSubmissions
|> Async.RunSynchronously
|> printfn "%A"
