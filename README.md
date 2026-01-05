
# Task 1 – Backend APIs
- CRUD APIs for Events
- MongoDB Native Driver
- Schema-less design
- RESTful endpoints

# Task 2 – Nudge API Documentation
Task 2 focuses on designing and documenting APIs for a Nudge creation feature.


## Nudge Object Data Model

- Below is the reference object model for a Nudge.
- This is not a fixed schema. Fields may change or expand in the future.
- {
  "_id": "ObjectId",
  "assetType": "event | article",
  "assetId": "ObjectId",
  "title": "string (max 60 characters)",
  "coverImageUrl": "string",
  "description": "string",
  "icon": "string",
  "invitationText": "string",
  "scheduleAt": "ISO Date",
  "status": "draft | published",
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}

## Base API Information

- Base URL: /api/v3/app
- Content-Type: application/json
- Authentication: Not required (can be added later)


## CRUD API Endpoints

### Create a Nudge --> Endpoint  POST /nudges
- description => Creates a new nudge for an event or article.
- Request Payload
- {
  "assetType": "event",
  "assetId": "65abc1234def5678",
  "title": "Workshop Reminder",
  "coverImageUrl": "<img-url>",
  "description": "Join us for an interactive workshop on reflections.",
  "icon": "bell",
  "invitationText": "A great workshop is about to happen!",
  "scheduleAt": "2025-02-10T07:40:00.000Z",
  "status": "draft"
}

]
### Get All Nudges --> Endpoint   GET /nudges
- Description => Fetches a list of nudges with optional filters and pagination.


### Get a Single Nudge  --> Endpoint   GET /nudges/:id
- Description =>  Fetches a single nudge using its unique identifier.


### Update a Nudge   --> Endpoint   PUT /nudges/:id
- Description =>  Updates one or more fields of an existing nudge.

- Request Payload
{
  "title": "Updated Workshop Reminder",
  "scheduleAt": "2025-02-12T10:00:00.000Z",
  "status": "published"
}


### Delete a Nudge  --> Endpoint   DELETE /nudges/:id
- Description => Deletes a nudge permanently.

## Additional Notes

- The Nudge system is schema-less to allow flexibility and future expansion.
- Nudges can be associated with multiple asset types such as events and articles.
- Images are stored externally (e.g., CDN or cloud storage).
- Scheduling logic can be handled using background jobs or cron services.
- Designed to support preview, draft, and publish workflows.
- API structure follows RESTful best practices.
