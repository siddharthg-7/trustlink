# TrustLink AI Verification Service

A simple FastAPI service for scam detection and link verification.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the service:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

The service will be available at `http://localhost:8000`

## API Endpoints

### POST /verify
Verify a post and get AI confidence scores.

**Request:**
```json
{
  "title": "Amazing Internship Opportunity",
  "description": "Join our team for a paid internship",
  "sourceLink": "https://example.com/internship",
  "category": "INTERNSHIP",
  "tags": ["tech", "intern"]
}
```

**Response:**
```json
{
  "confidenceScore": 85.5,
  "suspiciousScore": 14.5,
  "reasons": [],
  "isSafe": true
}
```

### GET /health
Health check endpoint.

## Integration

Update the `AI_VERIFICATION_API_URL` in your `.env` file to point to this service, then update the Next.js API route to call it.

## Future Enhancements

- Train a machine learning model for better detection
- Use NLP for sentiment analysis
- Integrate with external threat intelligence APIs
- Add link reputation checking

