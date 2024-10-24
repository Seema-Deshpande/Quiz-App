This is a simple quiz app built using Nest JS

**Features:**

* Multiple-choice questions
* Score tracking
* Feedback on answers

**To run the app:**

1. Clone or download the repository.
2. Run the docker-compose.yaml
 command:
    - docker-compose up --build

Sample Request and Response Formats
1. Creating a Quiz
Request:

POST /quizzes
Content-Type: application/json

{
  "id": 1,
  "title": "General Knowledge",
  "questions": [
    {
      "id": 1,
      "text": "What is the capital of India?",
      "options": ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      "correct_option": 0
    }
  ]
}


Response:
{
  "message": "QUIZ CREATED SUCCESSFULLY",
  "HttpStatus": 201
}

2. Getting a Quiz by ID
Request:

GET /quizzes/1

Response:
{
  "id": 1,
  "title": "General Knowledge",
  "questions": [
    {
      "id": 1,
      "text": "What is the capital of India?",
      "options": ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      "correct_option": 0
    }
  ]
}

3. Submitting an Answer
Request:

POST /quizzes/1/submit
Content-Type: application/json

{
  "user_id": "12345",
  "question_id": 1,
  "selected_option": 0
}

Response:
{
  "message": {
    "is_correct": true,
    "correct_option": 0
  },
  "HttpStatus": 200
}

4. Getting Results for a Quiz
Request:

GET /quizzes/1/results

Response:
{
  "message": {
    "quiz_id": 1,
    "user_id": "12345",
    "score": 1,
    "answers": [
      {
        "question_id": 1,
        "selected_option": 0,
        "is_correct": true
      }
    ]
  },
  "HttpStatus": 200
}



