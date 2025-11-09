"""
TrustLink AI Verification Service
A simple FastAPI service for scam detection and link verification
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import re
import urllib.parse

app = FastAPI(title="TrustLink AI Verification Service")


class VerificationRequest(BaseModel):
    title: str
    description: str
    sourceLink: str
    category: str
    tags: Optional[list] = []


class VerificationResponse(BaseModel):
    confidenceScore: float  # 0-100, percentage genuine
    suspiciousScore: float  # 0-100, percentage suspicious
    reasons: list[str]
    isSafe: bool


# Simple heuristic-based scam detection
def detect_scam_patterns(title: str, description: str, link: str) -> tuple[float, list[str]]:
    """
    Simple heuristic-based scam detection.
    In production, this would use a trained ML model.
    """
    reasons = []
    suspicious_score = 0.0
    
    # Check for common scam keywords
    scam_keywords = [
        'urgent', 'limited time', 'act now', 'click here', 'free money',
        'guaranteed', 'no risk', 'get rich quick', 'work from home',
        'make money fast', 'guaranteed income', 'risk-free'
    ]
    
    text = (title + ' ' + description).lower()
    for keyword in scam_keywords:
        if keyword in text:
            suspicious_score += 5
            reasons.append(f"Contains suspicious keyword: '{keyword}'")
    
    # Check URL patterns
    try:
        parsed = urllib.parse.urlparse(link)
        domain = parsed.netloc.lower()
        
        # Check for suspicious domains
        suspicious_domains = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl']
        if any(sus in domain for sus in suspicious_domains):
            suspicious_score += 10
            reasons.append("Uses URL shortener (potential phishing)")
        
        # Check for IP addresses in URL
        if re.match(r'^\d+\.\d+\.\d+\.\d+', domain):
            suspicious_score += 15
            reasons.append("Uses IP address instead of domain")
            
        # Check for HTTPS
        if parsed.scheme != 'https':
            suspicious_score += 5
            reasons.append("Not using HTTPS")
    except:
        suspicious_score += 20
        reasons.append("Invalid or suspicious URL format")
    
    # Check for excessive exclamation marks or caps
    if text.count('!') > 5:
        suspicious_score += 5
        reasons.append("Excessive exclamation marks (common in scams)")
    
    if sum(1 for c in title if c.isupper()) > len(title) * 0.5:
        suspicious_score += 5
        reasons.append("Excessive capitalization (common in scams)")
    
    # Check description length (very short descriptions are suspicious)
    if len(description) < 20:
        suspicious_score += 10
        reasons.append("Very short description (potential scam)")
    
    # Cap suspicious score at 100
    suspicious_score = min(suspicious_score, 100.0)
    confidence_score = 100.0 - suspicious_score
    
    return confidence_score, reasons


@app.post("/verify", response_model=VerificationResponse)
async def verify_post(request: VerificationRequest):
    """
    Verify a post and return AI confidence scores
    """
    try:
        confidence_score, reasons = detect_scam_patterns(
            request.title,
            request.description,
            request.sourceLink
        )
        
        # Adjust based on category
        if request.category == 'SCAM_REPORT':
            # If it's already a scam report, it's likely legitimate reporting
            confidence_score = min(confidence_score + 20, 100)
        elif request.category == 'INTERNSHIP':
            # Internships might have some legitimate urgency
            confidence_score = min(confidence_score + 5, 100)
        
        is_safe = confidence_score >= 60  # Threshold for "safe"
        
        return VerificationResponse(
            confidenceScore=round(confidence_score, 2),
            suspiciousScore=round(100 - confidence_score, 2),
            reasons=reasons[:5],  # Limit to 5 reasons
            isSafe=is_safe
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "TrustLink AI Verification"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

