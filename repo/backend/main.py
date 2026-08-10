import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.database import Base, engine
from backend.auth.auth_router import router as auth_router
from backend.auth.dependencies import get_current_user, require_role
from backend.analytics.routes import router as analytics_router
from backend.campaigns.routes import router as campaigns_router
from backend.seed_campaigns import seed_campaigns

app = FastAPI(title="SmartReach API")

# Local dev origins are always allowed. Add your deployed frontend URL
# via the FRONTEND_URL environment variable once you host it (see README).
default_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
extra_origin = os.getenv("FRONTEND_URL")
if extra_origin:
    default_origins.append(extra_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=default_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
seed_campaigns()

app.include_router(auth_router)
app.include_router(analytics_router)
app.include_router(campaigns_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/protected/test")
def protected_test(user=Depends(get_current_user)):
    return {"message": "You are authenticated", "user_id": user.id, "role": user.role}


@app.get("/admin/test")
def admin_test(user=Depends(require_role(["admin"]))):
    return {"message": "Welcome Admin", "user_id": user.id, "role": user.role}
